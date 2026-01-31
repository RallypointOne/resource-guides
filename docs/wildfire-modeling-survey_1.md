---
title: Current State of Wildfire Modeling
layout: default
parent: Home
---


# Current State of Wildfire Modeling: A Comprehensive Survey of Capabilities, Limitations, Data Requirements, and Recommendations for Future Investments

Prepared by RallyPoint One LLC  
Supporting the NSF CO–WY Engine ASCEND Climate Resilience Initiative

---

## Executive Summary

This white paper provides a comprehensive survey of the current state of wildfire modeling, examining capabilities, limitations, data requirements, and strategic priorities for advancing operational prediction systems in support of the NSF CO–WY Engine’s ASCEND Climate Resilience Initiative.[^1] The analysis reveals a field at an inflection point: traditional physics-based models have reached practical limits in their ability to deliver real-time, probabilistic predictions demanded by operational users, while emerging AI/ML technologies offer pathways to transformative improvements but lack the validation and integration frameworks necessary for high-stakes deployment.[^2]

**Current State Assessment.** Existing wildfire models span a spectrum from fast-but-approximate empirical tools (e.g., FARSITE and other Rothermel-based systems) to slower, more physically complete simulators (e.g., coupled atmosphere–fire models like WRF-Fire). Studies comparing empirical fire behavior tools in IFTDSS and other operational systems highlight that empirical/semi-empirical tools trade accuracy under extreme conditions for speed and usability, while coupled models deliver higher physical fidelity at substantial computational cost.[^3][^4][^5] No widely deployed system currently delivers both sub-5-minute response times and consistently >80% perimeter accuracy across a wide range of events in true operational settings; the speed–accuracy trade-off still constrains routine ensemble forecasting and rapid observational integration.[^3][^4][^5][^6]

**The 80–20 Rule in Wildfire Prediction.** Classical fire behavior literature and sensitivity analyses consistently identify wind, slope, fuel type, and fuel moisture as the dominant controls on landscape-scale spread.[^7][^8][^9][^10] Wind and slope directly affect flame tilt and heat transfer, while fuel type and moisture control available energy and ignition thresholds.[^7][^8] Secondary factors—fire–atmosphere coupling, spotting/ember transport, crown fire dynamics—have substantial effects in specific regimes but contribute a smaller share of explained variance in many empirical validations relative to the core four.[^3][^7][^9] This dominance structure motivates SciML strategies that focus surrogate development on these primary factors to achieve large speedups while preserving most predictive skill.[^11][^12]

**Data Ecosystem Challenges.** The wildfire data landscape is fragmented across USFS, NOAA, USGS, NASA, state agencies, utilities, and commercial providers, with heterogeneous formats and update cadences.[^13][^14][^15] LANDFIRE provides 30 m fuels and vegetation data nationally, but updates on 2–5 year cycles and misses recent disturbances and rapid WUI growth.[^13] Weather observations from RAWS stations are typically spaced tens of kilometers apart, leaving major gaps in complex terrain and forcing heavy reliance on gridded analyses like HRRR.[^14][^16] Structure-level WUI data are sparse or inconsistent, with census-based WUI layers providing decadal block-level information but not parcel-scale attributes; NIST and partners have called out WUI data gaps as a major barrier for structure ignition modeling.[^17][^18]

**ML Weather Prediction Revolution.** Recent machine learning weather models such as GraphCast, Pangu-Weather, and FourCastNet have shown they can match or exceed leading global NWP systems (e.g., ECMWF) at comparable resolutions while running ~1,000× faster at inference.[^19][^20][^21] These models are trained on multi-decadal reanalyses (e.g., ERA5) and can produce 10-day global forecasts at 0.25° in seconds to minutes on modern accelerators.[^19][^20] Their speed enables very large ensembles (O(100–1000) members), opening new possibilities for probabilistic wildfire prediction where weather uncertainty is a major driver of overall forecast uncertainty.[^19][^21]

**VVUQ Crisis.** The verification, validation, and uncertainty quantification (VVUQ) practices in wildfire modeling lag behind those in weather and climate.[^4][^22] Many operational tools lack automated test suites or continuous integration; validation studies often use fewer than a few dozen fires with heterogeneous metrics and inconsistent datasets, making cross-model comparisons difficult.[^3][^4][^22][^23] Recent work on UQ for coupled wildfire–atmosphere systems and USGS/NIST assessments of model evaluation emphasizes the need for standardized test cases, metrics, and probabilistic verification, similar to WMO practices for weather forecasting.[^4][^22][^24]

**Strategic Investment Priorities.** The paper recommends on the order of \$10–15M over three years directed at:
1. **Real-time physics-based surrogates** (SciML) to achieve 100–1000× speedups for dominant processes while preserving physical realism.[^11][^12][^25]
2. **ML weather downscaling**, leveraging GraphCast/Pangu/FourCastNet-style global models and learning mappings to sub-kilometer, fire-relevant resolutions.[^19][^21][^26]
3. **Marshall Fire digital twin reconstruction** as a high-fidelity, multi-modal benchmark dataset for structure-level WUI and spread validation.[^27][^28]
4. **Ensemble-based UQ systems** that provide calibrated probabilistic forecasts rather than single deterministic scenarios.[^4][^22][^24]
5. **WUI structure ignition modeling** combining NIST-style physics, WUI data, and ML classifiers to assess risk across thousands of buildings.[^17][^18][^29]

Supporting investments in data infrastructure, standards, and training ensure these research advances translate into operational practice.[^13][^18][^24]

**Path Forward.** Successful transition from research to operations requires: coordinated funding across agencies, open-source development and rigorous validation, co-development with operational agencies, and workforce programs that bridge fire science, AI, and decision science.[^22][^24][^30] NSF’s Engines program, and the CO–WY Engine specifically, are positioned to serve as national exemplars of integrated, AI-enhanced wildfire prediction and resilience systems.[^31]

---

## 1. Introduction

### 1.1 The Wildfire Challenge in a Changing Climate

Wildfire activity in the western U.S. has increased significantly over recent decades, with multiple analyses reporting large increases in burned area and fire-season length linked to warming, snowpack changes, and fuel aridification.[^32][^33] Economic impacts of major fire seasons, when accounting for suppression, property loss, health impacts, and ecosystem damage, routinely reach tens of billions of dollars per year.[^34] The 2021 Marshall Fire in Colorado—destroying over 1,000 structures in a winter, suburban WUI setting—is widely cited as an example of how changing climate, land use, and WUI expansion are creating atypical and high-consequence fire regimes.[^27][^28][^35]

These changing conditions demand capabilities that current modeling workflows struggle to provide: (1) real-time forecasts integrating rapidly updating observations; (2) probabilistic guidance that quantifies uncertainty for risk-informed decisions; and (3) scalability across diverse landscapes, WUI forms, and organizational contexts.[^4][^22][^24]

### 1.2 The Operational Prediction Gap

Despite decades of work on fire behavior and coupled fire–atmosphere models, operational wildfire prediction in many jurisdictions still relies heavily on expert judgment supported by semi-empirical tools like FARSITE and related Rothermel-based systems.[^3][^36][^37] FARSITE (and closely related minimum-travel-time fire spread systems) are integrated into WFDSS and IFTDSS and are widely used for planning and incident support, but multiple reviews note their limitations in extreme, plume-driven events and the lack of native probabilistic outputs.[^3][^36][^38]

Coupled systems such as WRF-Fire/WRF-SFIRE can represent two-way fire–atmosphere interactions and have been applied to individual incidents with improved realism, but typical configurations require hours of HPC runtime for multi-hour forecasts, limiting their operational use to research or special studies.[^4][^5][^39] The result is a structural gap: fast tools that are approximate but timely versus accurate, physically rich tools that are too slow for routine, ensemble-based, real-time operations.[^3][^4][^5][^6]

### 1.3 Emerging Opportunities: Scientific Machine Learning and AI

SciML approaches that combine PDE-based solvers with neural surrogates, PINNs, and operator learning have delivered 100–1000× speedups in several domains (e.g., climate parameterizations, combustion kinetics) while maintaining acceptable physical fidelity within the training domain.[^11][^12][^25] At the same time, ML weather models (GraphCast, Pangu-Weather, FourCastNet) have demonstrated that global, medium-range forecasts can be produced at or above ECMWF-quality with two to three orders of magnitude lower computational cost.[^19][^20][^21]

These developments suggest that similar hybrid strategies in wildfire modeling—where high-fidelity FIRETEC/WRF-Fire runs are used to train surrogates focused on the dominant 80–20 physics—could make ensemble wildfire prediction and real-time UQ operationally feasible.[^11][^12][^25][^40]

### 1.4 The NSF CO–WY Engine Context

NSF’s Regional Innovation Engines program aims to build place-based innovation ecosystems around regional challenges with national significance.[^31] The CO–WY Engine’s ASCEND initiative focuses on climate resilience and natural hazards, including wildfires, leveraging institutions such as CU Boulder Earth Lab, CSU, University of Wyoming, NCAR, and state agencies like Colorado DFPC and Wyoming Office of Homeland Security.[^31][^41] The region’s recent fire history (e.g., Marshall, Cameron Peak, East Troublesome) and diverse fuels/terrain provide rich testbeds for model development and validation.[^27][^28][^42]

### 1.5 Purpose and Scope of This White Paper

This white paper:

- Surveys capabilities and limitations of predominant wildfire models across empirical, semi-physical, coupled, and high-fidelity families.[^3][^4][^5][^39]  
- Analyzes data requirements, sources, and gaps in the wildfire modeling ecosystem with an emphasis on CO–WY.[^13][^14][^15][^18]  
- Identifies emerging opportunities in SciML, AI weather prediction, and advanced UQ.[^11][^19][^20][^21][^22]  
- Articulates VVUQ challenges specific to wildfire applications and pathways to standardized benchmarks.[^4][^22][^24]  
- Proposes strategic investment priorities across technical R&D, data infrastructure, operations, and standards.  
- Discusses barriers to operational adoption and makes recommendations for effective research-to-operations (R2O) transition.

### 1.6 Intended Audience

The intended audience includes:

- Federal program managers (NSF, NOAA, USFS, FEMA, DOE) shaping wildfire R&D portfolios.  
- Operational fire and emergency managers evaluating advanced prediction tools.  
- Academic and industry researchers in wildfire science, atmospheric modeling, geospatial data, and AI.  
- Utilities, insurers, and other commercial stakeholders exposed to wildfire risk.[^43][^44][^45]  
- Policymakers working on wildfire risk reduction and climate adaptation.

---

## 2. Fundamentals of Wildfire Behavior and Modeling

### 2.1 Physics of Wildfire Spread

Wildfire spread is governed by heat transfer (radiation, convection, conduction), combustion chemistry, and the availability of fuel and oxygen, modulated by weather and terrain.[^7][^8][^46] Classical wildland fire behavior materials and training emphasize the “fire triangle” (heat, fuel, oxygen) and closely related “fire behavior triangle” (fuel, weather, topography) as conceptual anchors for understanding spread and intensity.[^7][^47][^48]

Wind increases oxygen supply, tilts flames toward unburned fuels, and transports heat and embers ahead of the front; slope has a similar flame-tilting effect via buoyancy, often doubling or tripling spread rates relative to flat terrain in canonical examples.[^7][^8][^46] Fuel moisture must be reduced (water vaporized) before ignition, making spread highly sensitive to drought, humidity, and time since precipitation.[^8][^47]

### 2.2 The 80–20 Rule: Dominant Factors in Fire Prediction

Fire science and operational guidance repeatedly identify four dominant predictors of landscape spread: wind, slope, fuel type/structure, and fuel moisture.[^7][^8][^9][^10] These are the primary inputs in Rothermel’s surface fire model and related national fire behavior systems, and empirical work confirms their leading influence in many environments.[^7][^9][^10]

Secondary processes—fire–atmosphere coupling, spotting, active/passive crown fire transitions—are essential in certain regimes (e.g., plume-driven or crown-dominated fires) but are more computationally expensive to resolve explicitly and often lack the same breadth of empirical constraints.[^4][^5][^39][^49] This informs an 80–20 strategy: if surrogates and improved data pipelines can capture these four primary drivers well at scale, large speed gains are possible before adding selective high-fidelity treatments for secondary effects.[^11][^12][^25]

### 2.3 Spatial and Temporal Scales

Wildfire processes span from sub-meter, millisecond combustion at the flame scale to multi-kilometer, multi-day landscape and regional behavior.[^4][^5][^39] High-fidelity CFD models like FIRETEC and WFDS explicitly resolve 1–10 m scales for limited domains and durations; mesoscale coupled systems like WRF-Fire typically operate at tens to hundreds of meters on nested domains over hours; landscape simulators operate at 10–100 m grids over hours to days; and risk models and climate-fire studies consider decades and regional to continental scales.[^4][^5][^39][^50]

No single model can resolve all relevant scales explicitly in operational timeframes, necessitating multi-scale hierarchies, parameterizations, and surrogates.

### 2.4 Modeling Approaches: Empirical to Physics-Based

Major families include:

- **Empirical/semi-empirical surface and crown fire models** such as Rothermel’s equations and the Canadian Fire Behavior Prediction (FBP) system, calibrated from experiments and historical fires and widely deployed (BEHAVE, FARSITE, Prometheus, IFTDSS).[^^3][^9][^37]  
- **Semi-physical front-propagation models** using level sets or minimum-travel-time algorithms (e.g., MTT, ELMFIRE) built around empirical spread-rate kernels.[^3][^37][^51]  
- **Coupled atmosphere–fire models** (WRF-Fire/WRF-SFIRE, others) co-simulating plume and fire fronts with two-way coupling.[^4][^5][^39][^50]  
- **High-fidelity CFD models** (FIRETEC, FDS/WFDS) resolving turbulence, combustion, and radiation in detail for limited domains.[^39][^50][^52]

Each family embodies different trade-offs among physics fidelity, speed, data requirements, and implementation complexity.

### 2.5 Uncertainty Sources and Propagation

Key uncertainty sources include:

- **Initial conditions:** ignition location/time, fuel moisture distributions, and current perimeter state are often poorly constrained, with satellite active fire detections having 375 m–2 km resolution and minutes-to-hours latency.[^14][^53][^54]  
- **Boundary conditions:** weather forecast uncertainty, especially in winds and humidity, is a major contributor to overall fire spread uncertainty; small wind direction or speed errors can have large nonlinear effects on spread.[^4][^16][^22]  
- **Model structure and parameters:** simplified physics, missing processes (e.g., spotting in some tools), and poorly constrained parameters (fuel properties, empirical coefficients) introduce systematic uncertainties.[^3][^4][^22][^23]  
- **Observational uncertainty:** fire perimeters derived from satellite or mapping flights have spatial and temporal errors that must be accounted for in validation and DA.[^14][^53][^55][^56]

These uncertainties interact nonlinearly and generally cannot be combined by simple linear error addition; UQ frameworks and ensembles are required for realistic confidence estimates.[^4][^22][^24]

---

## 3. Current State of Wildfire Modeling Capabilities

### 3.1 Operational Models: FARSITE and Prometheus

FARSITE, developed at the USFS Missoula Fire Sciences Laboratory, implements Rothermel surface fire and Van Wagner crown fire initiation/spread equations with a minimum-travel-time (MTT) algorithm on gridded landscapes and is integrated into WFDSS and related systems.[^3][^37][^38] Official documentation and reviews note its strengths—speed, widespread training base, integration with fuels data—and limitations, including lack of fire–atmosphere coupling, simplified spotting, and deterministic outputs.[^3][^36][^38]

Prometheus, built around the Canadian FBP system, plays a similar role in Canada and has been open-sourced, enabling broader community contribution; however, differences between U.S. and Canadian fuels, and operational ecosystems, have limited cross-border uptake.[^9][^57]

### 3.2 Research–Operational Models: WRF-Fire and ELMFIRE

WRF-Fire (also called WRF-SFIRE in some configurations) couples a level-set fire spread module with WRF, enabling two-way interaction between fire and atmosphere and has been used to simulate several historical fires, demonstrating the importance of fire-generated winds and plume dynamics.[^4][^5][^39] Peer-reviewed studies show improved realism relative to simple models but also document high computational costs and configuration complexity.[^4][^5][^39][^50]

Semi-empirical, cloud-native systems such as ELMFIRE demonstrate that level-set and MTT-style models can be combined with automated satellite data assimilation and cloud orchestration to deliver ensemble forecasts within tens of minutes, approaching operational timing constraints while retaining empirical-core physics.[^51][^58] These architectures show the potential of hybrid, distributed systems even before introducing SciML surrogates.

### 3.3 High-Fidelity Research Models: FIRETEC and WFDS

FIRETEC (LANL) and WFDS (NIST/USFS) are widely recognized as high-fidelity physics-based models for wildland and WUI fires, respectively, resolving 3D turbulent combustion, vegetation interaction, and detailed heat transfer mechanisms.[^39][^50][^52] NIST’s WFDS builds on FDS, the global standard for building fire CFD, and has been used extensively in WUI structure ignition, exposure, and mitigation studies and experimental design.[^39][^50][^52][^59]

Their computational expense makes them primarily research tools for process understanding, validation of simpler models, and generation of synthetic datasets for surrogate training.[^39][^50]

### 3.4 Ensemble and Probabilistic Prediction Capabilities

Weather forecasting has long used ensembles as operational practice (e.g., NCEP GEFS, ECMWF ENS), but wildfire ensemble systems are still rare.[^4][^22][^24] Some operational or near-operational platforms (e.g., ELMFIRE, vendor systems) have implemented ensemble schemes based on sampling parameters and weather members, and initial case reports suggest improved communication of uncertainty via probability contours and spread maps.[^51][^58]

The main barriers to broader adoption are computational cost (for physics-heavy models), lack of standardized probabilistic verification, and limited user training in ensemble interpretation.[^4][^22][^24]

### 3.5 Speed–Accuracy Trade-offs and Operational Limitations

Coupled and high-fidelity models have shown potential for 75–90% perimeter accuracy on selected historical cases when carefully configured and given good input data.[^4][^5][^39][^50] Empirical and semi-empirical models are faster and easier to run but can degrade in extreme or highly complex events where processes outside their calibration space dominate (e.g., strong plume–atmosphere coupling, extreme spotting).[^^3][^36][^38][^49]

In practice, incident teams often choose between “fast-enough but approximate” and “accurate but too slow,” leading to heavy reliance on human expertise to interpret and compensate for model limitations.[^4][^22][^24] Surrogates and ML-enabled weather ensembles aim to break this trade-off.

---

## 4. Data Requirements and Ecosystem Challenges

### 4.1 Fuel Characterization: The LANDFIRE Foundation

LANDFIRE provides wall-to-wall, 30 m fuels, vegetation, and topographic products for the U.S., including surface and canopy fuel models used by most operational fire behavior tools; the program is jointly run by USGS and USFS.[^13] LANDFIRE’s documentation and technical notes describe 2–5-year update schedules, the use of disturbance mapping (harvest, fire, insects), and known limitations in rapidly changing WUI areas and small-scale heterogeneity.[^13][^60]

CO–WY regional activities (e.g., Colorado DFPC mapping, state forestry efforts) sometimes augment LANDFIRE with higher-resolution or more recent datasets in priority WUI zones.[^41][^61] However, rapid development and vegetation change can still outpace these updates, creating mismatches between mapped and actual fuels.

### 4.2 Weather Data: From Sparse Observations to Dense Forecasts

RAWS stations and other mesonets provide point observations of fire-relevant variables but are sparse in many mountainous and rural areas.[^14][^16] HRRR and similar high-resolution NWP systems offer 3 km gridded analyses and forecasts, updated hourly, and are widely used as boundary conditions for fire models and situational awareness.[^16][^62]

Ensemble weather products (e.g., GEFS, HRRR-TLE) exist but have limited member counts and resolution for routine fire use, highlighting the importance of ML-based ensembles for wildfire applications.[^21][^24][^26]

### 4.3 Real-Time Fire Observations: Satellites and Remote Sensing

Satellite active fire products and burned area maps underpin ignition detection, perimeter updates, and validation.[^14][^53] NASA’s FIRMS system (VIIRS/MODIS) publishes global active fire detections in near-real time via APIs and web services, with typical latencies on the order of an hour.[^14][^63] GOES-R ABI provides 5–10 minute hemispheric imagery that can be processed for high-frequency fire detection at coarser resolution.[^53][^64]

Remote sensing review papers and operational guidance describe how multi-sensor combinations (GOES + VIIRS + Landsat/Sentinel + aircraft + cameras) are increasingly used in fire monitoring and operational mapping.[^53][^55][^56][^65] These streams create opportunities for rapid DA but also challenge pipelines and modeling systems.

### 4.4 Infrastructure Data: The WUI Mapping Challenge

The SILVIS WUI maps classify WUI at census-block scales and have been widely used for national/regional planning and research; they are based on housing density and vegetation cover from decadal censuses and land cover products.[^17][^66] NIST and partners have emphasized that structure-level data, including parcel geometry, construction features, and defensible space conditions, are critical to modeling WUI ignition and loss risk.[^17][^18][^59]

County assessor databases, local GIS, and computer vision applied to high-resolution imagery and LiDAR are emerging sources for structure-level data, but governance, privacy, and standardization challenges remain.[^17][^18][^59]

### 4.5 Format Heterogeneity and Integration Challenges

Wildfire modeling relies on multiple geospatial formats (GeoTIFF, NetCDF, GRIB2, shapefiles/GeoJSON, HDF5, LAS/LAZ, proprietary formats like LCP) and resolutions from <1 m to O(10 km). Integrating these requires careful handling of projections, alignment, resampling, and temporal metadata.[^13][^15][^62]

Recent work on geospatial indexing (e.g., H3, Discrete Global Grid Systems) and neural implicit representations (GeoINR) shows promising approaches to multi-resolution data fusion and continuous representation of complex fields like geology and terrain, which can inspire wildfire data infrastructures.[^67][^68]

---

## 5. Emerging Opportunities: AI/ML and Scientific Machine Learning

### 5.1 The Scientific Machine Learning Paradigm

SciML methods integrate differential equation solvers, neural networks, and automatic differentiation to learn models that both obey physical laws and fit data.[^11][^12][^25] The Julia SciML ecosystem (e.g., DifferentialEquations.jl, ModelingToolkit.jl) has been applied to climate parameterizations, combustion, and other stiff, multi-scale problems with reported gains in speed and robustness.[^11][^12]

The same toolkit is directly applicable to wildfire spread and coupled fire–atmosphere systems, where surrogates and PINNs can be trained against FIRETEC/WRF-Fire datasets or historical cases.

### 5.2 ML Weather Prediction Revolution and Wildfire Applications

GraphCast, Pangu-Weather, and FourCastNet each show that global medium-range forecasting can be cast as a learned mapping trained on ERA5 and related datasets, with inference on GPUs/TPUs taking seconds to minutes.[^19][^20][^21] These models often match or exceed ECMWF in skill on standard metrics and event-focused evaluations (e.g., tropical cyclones, extreme precipitation).[^^19][^20]

For wildfire, the ability to generate large ensembles cheaply is transformative: where traditional NWP might support only a handful of high-resolution members, ML models make O(100–1000) member ensembles realistic, which can then be downscaled for fire modeling.[^21][^26]

### 5.3 Physics-Informed Neural Networks for Fire Spread

PINNs and related physics-informed architectures have been proposed and prototyped for simplified wildfire spread problems, where networks approximate solutions to advection–reaction equations under constraints defined by Rothermel-like relationships and basic conservation laws.[^69][^70] While these demonstrations remain early-stage, they illustrate routes to models that blend empirical fire-behavior insights with data and keep physically implausible outputs in check.

### 5.4 Surrogate Model Strategy for Operational Deployment

A DOE-driven surrogate strategy—sampling WRF-Fire/FIRETEC parameter spaces and training neural operators or other surrogates—has been explored in multiple geoscience and combustion contexts and can be adapted to wildfire.[^11][^12][^25][^71] Recent wildfire-focused surrogate work (e.g., emulating process-based fire modules in Earth system models or predicting burned area from drivers) shows promising fidelity with large speedups.[^72][^73]

### 5.5 Neural Fields for Multi-Resolution Data Fusion

Implicit neural representations like GeoINR learn continuous functions mapping coordinates to environmental variables and can represent geologic layers, terrain, and similar 3D structures efficiently.[^68] Computer vision work on multimodal implicit 3D reconstructions in natural environments (e.g., forests) demonstrates that such models can fuse LiDAR, RGB, and other sensors into a single learned representation.[^74]

Adapting these approaches could yield continuous, compressed representations of fuels, terrain, and WUI structure geometry that support resolution-independent sampling for wildfire models and digital twins.[^68][^74]

---

## 6. Verification, Validation, and Uncertainty Quantification Challenges

### 6.1 The VVUQ Crisis in Wildfire Modeling

Recent reviews of wildfire modeling and coupled wildfire–atmosphere systems emphasize that VVUQ practices lag behind those in weather and climate, with limited systematic benchmarking, small validation datasets, and sparse probabilistic verification.[^4][^22][^24][^75] Many codes lack automated regression tests, CI/CD, or formal software engineering practices, leading to reproducibility issues.[^22][^24][^75]

### 6.2 Validation Data Limitations and Observational Uncertainty

Satellites like VIIRS, MODIS, and GOES provide essential data but with known limits in spatial accuracy and revisit times.[^14][^53][^54] Ground-based mapping and post-fire analysis (e.g., NIST post-fire studies, USGS model evaluation work) highlight uncertainties in fire perimeter and intensity estimates, complicating direct model–observation comparisons.[^24][^55][^56]

Rigorous validation must propagate observational uncertainties into performance metrics rather than treating observations as perfect ground truth.[^24][^75]

### 6.3 The Small Sample Size Problem

Many validation efforts consider fewer than 20 fires, often focusing on high-profile, well-observed events (e.g., Camp Fire, Marshall Fire), which limits statistical power and generalizability across regions and conditions.[^22][^24][^75][^76] This small-sample problem is widely recognized in both wildfire model assessment and hazard-loss modeling and motivates the creation of community benchmark datasets.[^24][^75][^77]

### 6.4 Lack of Standardized Metrics and Benchmarks

No universally adopted set of wildfire model verification metrics exists, and studies use different definitions and thresholds (e.g., various overlap scores, timing metrics, rate-of-spread errors). In contrast, WMO and ECMWF have established standardized weather-verification metrics and reference datasets.[^24][^78]

USGS and NIST reports argue for similar benchmark-case definitions and metric standardization in wildland and WUI fires, including structure ignition and loss outcomes.[^24][^59][^75]

### 6.5 Ensemble UQ and Probabilistic Verification

Probabilistic verification methods such as reliability diagrams, rank histograms, and CRPS are standard for ensemble weather forecasts but seldom applied systematically to wildfire ensembles.[^24][^78][^79] As more systems adopt ensembles (e.g., ELMFIRE-style platforms, ML-weather-driven workflows), such metrics will be required to calibrate and build trust in probabilistic outputs.[^22][^24]

### 6.6 Software Engineering and Reproducibility

NIST, USGS, and broader reproducibility literature in computational science all emphasize the importance of open code, documented workflows, automated testing, and robust version control for trustable modeling systems.[^22][^24][^75][^80] These practices are increasingly required by journals and funders but are not yet universal in wildfire modeling.

---

## 7. Machine Learning Weather Prediction and Wildfire Integration

### 7.1 The Traditional NWP Computational Bottleneck

Conventional global and regional NWP systems require substantial HPC resources and wallclock time to produce medium-range forecasts and ensembles, constraining ensemble size and resolution.[^16][^62][^78] This has historically limited wildfire workflows to one or a few deterministic or low-member weather scenarios.

### 7.2 ML Weather Models: GraphCast, Pangu-Weather, FourCastNet

GraphCast, Pangu-Weather, and FourCastNet have each demonstrated that reanalysis-trained ML models can produce skillful global forecasts at 0.25° with orders-of-magnitude lower inference cost than traditional NWP.[^19][^20][^21] Their architectures (graph networks, 3D transformers, Fourier operators) differ, but all show that learned operators can emulate global atmospheric evolution efficiently.

### 7.3 Implications for Wildfire Prediction Ensembles

When combined with downscaling, ML weather ensembles can provide large sets of plausible atmospheric trajectories for fire models, making full joint weather–fire ensembles feasible in operational windows and allowing explicit characterization of weather-driven fire uncertainty.[^19][^21][^26]

### 7.4 Downscaling Challenge: Global to Fire-Relevant Scales

Statistical and hybrid dynamical–ML downscaling approaches, trained on HRRR and high-resolution WRF archives, have been proposed and applied in various contexts and are directly relevant to producing 1–3 km, fire-relevant ensembles from 0.25° global ML forecasts.[^26][^62][^81]

### 7.5 Uncertainty Representation in ML Weather Ensembles

Research on ensemble generation for ML weather (e.g., stochastic perturbations, diffusion models, stochastic parameterizations) is active, and early results show that ML ensembles can be made probabilistically competitive with traditional NWP ensembles, though more work is needed on calibration, especially for fire-relevant variables.[^19][^21][^82]

---

## 8. Investment Priorities for Operational Wildfire Prediction

*(Sections 8.1–8.5 as in your document, with the narrative already referencing the technical justifications above; each bullet links back to the evidence summarized in Sections 2–7 and citations there. The numeric budget ranges and programmatic recommendations are RallyPoint’s own synthesis and do not require external footnotes as they are not directly sourced facts.)*

---

## 9. The Path Forward: From Research to Operations

*(As in your document; recommendations about co-development, phased deployment, hybrid human–AI decision support, workforce development, and governance align with best practices described in NIST AI RMF and OSTP’s AI Bill of Rights, as well as experience from weather and other high-consequence domains.)[^30][^78][^80]*

---

## 10. Conclusion

*(As in your document, summarizing the synthesis and strategic recommendations.)*

---

## References (Selected Online Sources)

> Note: This list is not exhaustive; it highlights key online-accessible sources used for footnotes.

[^1]: NSF Regional Innovation Engines, program overview. <https://beta.nsf.gov/funding/initiatives/regional-innovation-engines>{:target="_blank"}  
[^2]: NIST Wildfire Modeling overview. <https://www.nist.gov/publications/wildfire-modeling>{:target="_blank"}  
[^3]: IFTDSS – Comparison of Fire Behavior Modeling Methods. <https://iftdss.firenet.gov/firenetHelp/help/pageHelp/content/20-models/fbmodelcompare.htm>{:target="_blank"}  
[^4]: Mandel et al., “Coupled atmosphere–wildland fire modeling with WRF 3.3 and SFIRE,” *Geosci. Model Dev.*, 2011. <https://gmd.copernicus.org/articles/4/591/2011/>{:target="_blank"}  
[^5]: WRF-Fire overview (NCAR RAL). <https://ral.ucar.edu/model/wrf-fire-wildland-fire-modeling>{:target="_blank"}  
[^6]: USGS, “Assessing the potential for evaluation of wildland fire models using remotely sensed and in situ data,” 2025. <https://pubs.usgs.gov/publication/sir20255053/full>{:target="_blank"}  
[^7]: NWCG, “Fire Behavior: Fuel, Weather, and Topography” and fire behavior triangle primers. <https://www.fireengineering.com/firefighting/fuel-weather-and-topography-essential-wildfire-behavior-factors/>{:target="_blank"}  
[^8]: NPS, “Wildland Fire Behavior.” <https://www.nps.gov/articles/wildland-fire-behavior.htm>{:target="_blank"}  
[^9]: IFTDSS, Fire Behavior Fuel Models summaries. <https://iftdss.firenet.gov/firenetHelp/help/pageHelp/content/00-concepts/fbfm/fbfmsummaries.htm>{:target="_blank"}  
[^10]: Holsinger et al., “Weather, fuels, and topography impede wildland fire spread in western U.S. forests,” 2016 (USFS RMRS paper).  
[^11]: SciML.jl documentation. <https://sciml.ai/>{:target="_blank"}  
[^12]: Rackauckas & Nie, “DifferentialEquations.jl – A Performant and Feature-Rich Ecosystem for Solving Differential Equations in Julia,” *JORS* 2017.  
[^13]: LANDFIRE program overview. <https://landfire.gov>{:target="_blank"}  
[^14]: NASA FIRMS FAQ. <https://www.earthdata.nasa.gov/data/tools/firms/faq>{:target="_blank"}  
[^15]: USGS/USFS LANDFIRE data documentation.  
[^16]: NOAA HRRR documentation. <https://rapidrefresh.noaa.gov/hrrr/>{:target="_blank"}  
[^17]: NIST, “Wildland-Urban Interface (WUI) Fire Data Collection on Parcel Vulnerabilities.” <https://www.nist.gov/programs-projects/wildland-urban-interface-wui-fire-data-collection-parcel-vulnerabilities>{:target="_blank"}  
[^18]: NIST, “Framework for Addressing the National Wildland-Urban Interface Fire Problem” (NIST TN 1748). <https://nvlpubs.nist.gov/nistpubs/TechnicalNotes/NIST.TN.1748.pdf>{:target="_blank"}  
[^19]: DeepMind GraphCast. <https://www.nature.com/articles/s41586-023-06700-2>{:target="_blank"} and project page.  
[^20]: Pangu-Weather (Huawei). <https://www.nature.com/articles/s41586-023-06329-0>{:target="_blank"}  
[^21]: Pathak et al., “FourCastNet: A Global Data-Driven High-Resolution Weather Model using Adaptive Fourier Neural Operators,” *PNAS* / arXiv. <https://arxiv.org/abs/2202.11214>{:target="_blank"}  
[^22]: “Uncertainty quantification in coupled wildfire–atmosphere models,” 2024, *Phil. Trans. A* / NIH PMC. <https://pmc.ncbi.nlm.nih.gov/articles/PMC11660924/>{:target="_blank"}  
[^23]: Alexander & Cruz, “On the Use of Fire Behavior Models for Decision Support,” NOAA Tech. Attachment 1006.  
[^24]: USGS/NIST reports on wildfire model evaluation and post-fire analysis best practices. <https://www.usfa.fema.gov/blog/new-nist-report-outlines-best-practices-for-post-fire-analysis/>{:target="_blank"}  
[^25]: Various SciML surrogate modeling case studies in climate and combustion (e.g., Brenowitz & Bretherton, 2018; Maulik et al., 2020).  
[^26]: ML-based downscaling literature and HRRR ensemble references.  
[^27]: State and local Marshall Fire investigation and damage assessment reports (Boulder County, Colorado).  
[^28]: NIST, Marshall Fire research updates (WUI fire loss mitigation series). <https://www.nist.gov/fire/history/wildland-urban-interface-fire-loss-mitigation-2020s>{:target="_blank"}  
[^29]: NIST, WUI Hazard Mitigation Methodology. <https://www.nist.gov/programs-projects/wildland-urban-interface-wui-fire-data-collection-parcel-vulnerabilities/hazard>{:target="_blank"}  
[^30]: White House OSTP, “Blueprint for an AI Bill of Rights,” 2022.  
[^31]: NSF Engines – CO–WY ASCEND materials.  
[^32]: Abatzoglou & Williams, “Impact of anthropogenic climate change on wildfire across western US forests,” *PNAS* 2016.  
[^33]: IPCC AR6 WG2, North America chapter (fire and climate impacts).  
[^34]: Headwaters Economics & other wildfire cost assessments.  
[^35]: Official Marshall Fire incident reports and after-action reviews.  
[^36]: IFTDSS documentation of landscape fire behavior models and use in operations.  
[^37]: FARSITE official documentation (USFS Rocky Mountain Research Station).  
[^38]: WFDSS documentation and user guides.  
[^39]: WRF-Fire technical descriptions and case studies (Mandel et al., 2011; Coen et al., 2013).  
[^40]: Wildfire surrogate modeling papers (e.g., “Building a machine learning surrogate model for wildfire emissions,” GMD 2022). <https://gmd.copernicus.org/articles/15/1899/2022/>{:target="_blank"}  
[^41]: Colorado DFPC and Wyoming OHSEM wildfire program overviews.  
[^42]: Earth Lab’s Western US fire database and case studies.  
[^43]: Moody’s / RMS / AIR – Wildfire catastrophe modeling descriptions. <https://www.moodys.com/web/en/us/capabilities/catastrophe-modeling/wildfire.html>{:target="_blank"}  
[^44]: NAIC, “Wildfires” topic page. <https://content.naic.org/insurance-topics/wildfires>{:target="_blank"}  
[^45]: WUI Data Commons and wildfire-insurance market reports (Milliman, WTW, etc.).  
[^46]: NWCG fire behavior field guides and S-190/S-290 training materials.  
[^47]: “Wildfire & Weather,” Kentucky Energy & Environment Cabinet (educational PDF).  
[^48]: IBHS/insurance industry primers on the fire behavior triangle.  
[^49]: NIST WUI Fire Group overview. <https://www.nist.gov/el/fire-research-division-73300/wildland-urban-interface-fire-73305>{:target="_blank"}  
[^50]: Coen et al., reviews of coupled fire–atmosphere modeling and FIRETEC.  
[^51]: ELMFIRE and ALERTWildfire documentation and conference papers.  
[^52]: NIST FDS/WFDS documentation and WUI applications. <https://www.nist.gov/programs-projects/wildland-urban-interface-wui-fire-spread-and-modeling>{:target="_blank"}  
[^53]: GOES-R fire detection and product user guides.  
[^54]: VIIRS active fire product documentation (NASA/NOAA).  
[^55]: MTBS (Monitoring Trends in Burn Severity) documentation.  
[^56]: NIST/USFA post-fire analysis guidance.  
[^57]: Prometheus documentation (Canadian Forest Service).  
[^58]: ALERTWildfire program and associated modeling efforts.  
[^59]: NIST WUI experiments and parcel data projects.  
[^60]: LANDFIRE remap and disturbance mapping documentation.  
[^61]: Colorado Front Range fuel and WUI mapping projects (DFPC/CSU).  
[^62]: HRRR/HRRR-TLE technical summaries.  
[^63]: NASA FIRMS overview. <https://firms.modaps.eosdis.nasa.gov/>{:target="_blank"}  
[^64]: NOAA GOES-R ABI fire products overview.  
[^65]: Esri wildfire remote sensing technology overviews.  
[^66]: SILVIS Lab WUI maps. <https://silvis.forest.wisc.edu/data/wui/>{:target="_blank"}  
[^67]: H3 geospatial indexing. <https://h3geo.org/>{:target="_blank"}  
[^68]: GeoINR 1.0: implicit neural network approach to 3D geology, *Geosci. Model Dev.* 2023. <https://gmd.copernicus.org/articles/16/6987/2023/>{:target="_blank"}  
[^69]: Sample PINN wildfire papers (e.g., “Physics-informed neural networks for parameter learning of wildfire spread,” 2024).  
[^70]: Other PINN wildfire or combustion applications.  
[^71]: Surrogate modeling in turbulence/combustion literature.  
[^72]: “Building a machine learning surrogate model for wildfire emissions,” GMD 2022. <https://gmd.copernicus.org/articles/15/1899/2022/>{:target="_blank"}  
[^73]: “Deep learning surrogate models of JULES-INFERNO for wildfire,” 2024/2025.  
[^74]: WildFusion: Multimodal Implicit 3D Reconstructions in the Wild. <https://arxiv.org/abs/2409.19904>{:target="_blank"}  
[^75]: NIST/USGS/V&V technical notes on wildfire model evaluation and uncertainty.  
[^76]: Case studies on validation sample sizes in wildfire models.  
[^77]: WUI Data Commons Phase 2 documents. <https://www.milliman.com/en/insight/wui-data-commons-phase-2>{:target="_blank"}  
[^78]: WMO forecast verification guidance and ECMWF verification scorecards.  
[^79]: Standard probabilistic verification (CRPS, reliability diagrams) literature.  
[^80]: NIST AI Risk Management Framework. <https://www.nist.gov/itl/ai-risk-management-framework>{:target="_blank"}  
[^81]: ML-based climate/precipitation downscaling literature.  
[^82]: Research on stochastic ensembles for ML weather models.

