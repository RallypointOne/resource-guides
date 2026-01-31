---
layout: default
title: Wildfire Simulation Models Catalog
nav_order: 3
description: "Technical catalog of current wildfire simulation models covering empirical, physics-based, and ML approaches"
has_toc: true
---

# Current Wildfire Simulation Models: A Technical Catalog
{: .fs-8 .fw-500 }

Companion to "Current State of Wildfire Modeling: A Comprehensive Survey"
{: .fs-5 .fw-300 .text-grey-dk-100 }

---

## 1. Introduction

Wildfire simulation models span a spectrum from fast, empirical tools designed for operational use to high‑fidelity CFD and coupled atmosphere–fire systems developed primarily for research and process understanding. Existing tools still face a structural speed–accuracy trade‑off: empirical and semi‑empirical models are fast and usable but struggle in extreme, plume‑driven events, while coupled and CFD models capture richer physics but remain too slow for routine ensemble forecasting in operations.

### 1.1 Major Modeling Approaches

Most wildfire simulators fall into a small number of core approaches:

**Empirical and semi‑empirical models** rely on experimentally or observationally derived relationships (e.g., Rothermel, Canadian FBP), typically implemented in tools like BEHAVE, BehavePlus, FARSITE, FlamMap, Prometheus, and many planning systems. They emphasize speed and broad usability but assume steady or slowly varying conditions and often simplify crown fire, spotting, and fire–atmosphere coupling.

**Semi‑physical front‑propagation models (level‑set/MTT/cell‑based)** use level‑set, minimum‑travel‑time, or cell‑based methods to evolve the fire perimeter, usually with empirical spread‑rate kernels. Examples include ELMFIRE, Cell2Fire, FSPro, and the propagation engines inside operational platforms like Wildfire Analyst and Spark.

**Coupled atmosphere–fire models** embed a fire spread module (typically level‑set with empirical spread rates) inside a mesoscale NWP model, allowing explicit two‑way interaction between fire and atmosphere. WRF‑Fire/WRF‑SFIRE and related regional systems are the principal examples.

**High‑fidelity CFD/WUI models** resolve 3D turbulent combustion, heat transfer, and (for WUI tools) structure‑scale flows and ignition processes. FIRETEC and WFDS/FDS are the most established representatives.

**ML and hybrid SciML approaches** learn spread or burned area from data or from high‑fidelity simulations, sometimes constrained by physical relationships. These include "next‑day spread" deep learning models, surrogates for process‑based models, and early physics‑informed neural network (PINN) prototypes.

Each approach makes distinct trade‑offs between physics fidelity, computational cost, data requirements, and interpretability.

### 1.2 Benefits and Limitations by Approach

**Empirical/semi‑empirical:**
- *Benefits:* Very fast (minutes for landscape simulations), modest computational requirements (single desktop), widespread training base, straightforward integration with fuels data such as LANDFIRE.
- *Limitations:* Limited treatment of plume‑driven behavior, spotting, and complex WUI flows; deterministic outputs are common, with limited native ensemble support and ad‑hoc uncertainty treatment.

**Semi‑physical front‑propagation (level‑set/MTT/cell‑based):**
- *Benefits:* Maintain empirical simplicity while enabling robust perimeter evolution on complex landscapes, ensemble generation, and automated data assimilation.
- *Limitations:* Fire–atmosphere coupling is usually parameterized or one‑way; accuracy depends strongly on spread‑rate parameterizations, fuel maps, and weather fields.

**Coupled atmosphere–fire:**
- *Benefits:* Represent fire‑generated winds, plume dynamics, and feedbacks explicitly, which improves realism in extreme events and complex terrain.
- *Limitations:* High computational cost (hours on tens to hundreds of cores for multi‑hour forecasts), complex configuration and data pipelines, limited use for faster‑than‑real‑time ensembles.

**High‑fidelity CFD/WUI:**
- *Benefits:* Detailed resolution of combustion, turbulence, radiation, and structure ignition, essential for WUI design, mitigation studies, and physics‑based benchmarks.
- *Limitations:* Domain sizes are typically ≲1 km² and time spans ≲1–2 h; runs often require many hours to days on HPC systems, limiting use to research and post‑event analysis.

**ML and SciML surrogates:**
- *Benefits:* Offer 10–1000× speedups relative to full physics models in other domains, enabling large ensembles and probabilistic outputs in operational time windows.
- *Limitations:* Wildfire‑specific applications are early‑stage, with limited validation, unclear behavior outside the training domain, and open questions about how to represent rare extremes and non‑stationarity.

### 1.3 Operational vs Research Roles and R2O Challenges

Operational agencies typically rely on empirical and semi‑empirical tools (e.g., FARSITE, FlamMap, Prometheus, Wildfire Analyst) embedded in platforms like WFDSS, IFTDSS, or national agency systems, because these tools are fast, familiar, and relatively easy to train on. Coupled and CFD models are used mostly in research, special studies, and post‑fire reconstructions, where run time and staff expertise are less constraining.

Key barriers to research‑to‑operations transition include:

- Computational cost that precludes routine ensembles or rapid updates
- Complex, fragile data pipelines for high‑resolution weather, fuels, and WUI data
- Limited standardized validation datasets and metrics, particularly for WUI and structure ignition
- Software engineering and reproducibility gaps (limited automated testing, documentation, and open code for some systems)

SciML‑based surrogates and ML weather ensembles offer a path to bridge this gap by emulating the "80–20" dominant physics at greatly reduced cost, while using high‑fidelity models as training signals and benchmarks.

### 1.4 CO–WY, Utility, and WUI Context

In Colorado–Wyoming, utilities and emergency managers face a combination of wind‑driven grassfires (e.g., Marshall‑type events), large forest fires in complex terrain, and expanding WUI in foothills and canyons. Operational tools must therefore support:

- Fast, repeatable ensemble runs driven by high‑resolution weather (HRRR or ML‑weather‑downscaled fields)
- Fuels representations that differentiate grass, shrub, and forest regimes and capture recent disturbances beyond baseline LANDFIRE
- Integration of WUI assets, transmission corridors, and substations to translate spread simulations into risk to infrastructure

The catalog below is designed to help practitioners, researchers, and program managers understand which models are best aligned to these needs, what computational assets and data each requires, and where surrogates or hybrid workflows may be most impactful.

---

## 2. Alphabetical Model Directory

Each entry includes: category tag; origin; simulation methodology; capabilities; validation; limitations; code availability; data requirements; compute needs; and operational status.

---

### BEHAVE (original system)
{: .text-grey-dk-100 }
**Category:** Empirical – legacy
{: .fs-3 }

**Origin and stewardship**
Developed by the USDA Forest Service fire behavior research program beginning in the 1970s as the first widely used computerized fire behavior prediction and fuel‑modeling system. It provided the foundation for later tools such as BehavePlus, FARSITE, FlamMap, and many training curricula.

**Simulation methodology**
Implements empirical/semi‑empirical fire behavior relationships (notably Rothermel surface fire spread), crown fire initiation, and related effects in a non‑spatial, point‑based calculator.

**Key capabilities and intended use**
- Point‑based predictions of rate of spread, flame length, intensity, and related metrics for specified scenarios
- Historical standard U.S. fire behavior tool and conceptual basis for later systems

**Validation and research use**
Used to calibrate and test Rothermel‑based formulations against experiments and field burns; many early validation efforts are documented in USFS reports.

**Known limitations**
- Non‑spatial and steady‑state; no perimeter evolution or time‑varying conditions
- Shares empirical limitations of its underlying equations in plume‑dominated or WUI regimes

**Code availability**
Legacy software no longer maintained for modern platforms, though equations are fully documented; effectively superseded by BehavePlus.

**Data requirements**
User‑specified fuel models, moisture, wind, slope, and related scalar inputs.

**Compute and performance**
Computationally trivial; essentially instantaneous.

**Operational status**
Superseded operationally but important as a historical and conceptual ancestor.

---

### BehavePlus
{: .text-grey-dk-100 }
**Category:** Empirical
{: .fs-3 }

**Origin and stewardship**
Developed by USFS and partners as the modern replacement for BEHAVE, with a modular GUI‑based system for point‑based fire behavior, fire effects, and fuel modeling.

**Simulation methodology**
Same empirical/semi‑empirical basis as BEHAVE, organized into modules (surface fire, crown fire, spotting, tree mortality, etc.), computing non‑spatial predictions for specified conditions.

**Key capabilities and intended use**
- Predicts rate of spread, flame length, intensity, spotting distances, scorch height, and other metrics at points, supporting planning and training
- Widely used for prescribed fire planning, fuel treatment design, and training scenarios

**Validation and limitations**
Validation inherited from underlying Rothermel‑based models and associated experiments; non‑spatial and steady‑state nature limits use for perimeter prediction.

**Implementation, data, compute, status**
Closed‑source Windows application using the documented equations; relies on user inputs (fuel, weather, topography) and runs instantly on desktops. It is part of standard NWCG training and remains widely used.

---

### Canadian Forest Fire Behavior Prediction (FBP) System
{: .text-grey-dk-100 }
**Category:** Empirical
{: .fs-3 }

**Origin and stewardship**
Developed by the Canadian Forest Service as part of the Canadian Forest Fire Danger Rating System (CFFDRS) to provide standardized fire behavior prediction across Canadian fuel types.

**Simulation methodology**
Empirical system predicting head fire spread, fuel consumption, intensity, and fire type from fuel type, Fire Weather Index (FWI) components, wind, slope, foliar moisture, and related inputs; elliptical growth is used to estimate area and perimeter properties.

**Key capabilities and intended use**
- Quantitative estimates of spread, intensity, crowning, and behavior for 16–18 standard fuel types
- Underpins decision‑making in Canadian agencies and serves as the spread‑rate kernel in Prometheus and other simulators

**Validation and research use**
Built on extensive Canadian experimental and field datasets; user guides and subsequent analyses document its performance and limitations.

**Known limitations**
- Calibrated for Canadian fuels and climate; direct application elsewhere requires careful mapping and adaptation
- Documented issues in some fuel models (e.g., grass models' response to curing and humidity) have led to refinements like C‑7b

**Code availability**
Equations are published and available in user guides; implemented in calculators, web tools, and embedded in simulators rather than in a single canonical codebase.

**Data requirements**
Fuel type from national fuel maps, FWI components, wind, slope, and ignition information.

**Compute and performance**
Computationally trivial; suitable for web calculators and embedding in larger simulations.

**Operational status**
Remains a core component of Canadian fire behavior prediction and is widely integrated into tools such as Prometheus and Cell2Fire.

---

### Cell2Fire
{: .text-grey-dk-100 }
**Category:** Front‑propagation
{: .fs-3 }

**Origin and stewardship**
Developed by an academic–industry team (Pais, Carrasco and collaborators) as an open‑source, cell‑based forest fire growth simulator.

**Simulation methodology**
Cell‑based front‑propagation where each grid cell contains fuel, weather, moisture, and topography attributes; fire spread between cells is governed by embedded spread models such as the Canadian FBP system. Time advances in discrete steps and is amenable to parallel execution.

**Key capabilities and intended use**
- Supports simulation of individual wildfires and integration into planning and optimization models for fuel treatments and landscape management
- Used for burn probability mapping and evaluation of long‑term management strategies

**Validation and research use**
Comparisons against Prometheus and real/hypothetical fires show similar accuracy to state‑of‑the‑art simulators, with reported accuracy above 90% in some experiments. Used in studies of FireSmart planning, tactical decisions, and adaptation to different fuel taxonomies.

**Known limitations**
- Physical realism bounded by the embedded spread‑rate models; extreme plume‑driven behavior and long‑range spotting are not explicitly resolved
- Originally tuned for Canadian fuels; adaptations are needed for other regions

**Code availability**
Open‑source on GitHub (research‑use license), implemented primarily in C++ with parallelization support.

**Data requirements**
Gridded fuels (from national fuel maps or LANDFIRE‑like products), DEM‑based topography, and weather scenarios (observed or synthetic).

**Compute and performance**
Designed for efficient multi‑core execution; reported speedups up to ~30× relative to some simulators, making it viable for ensembles and planning on workstations or small clusters.

**Operational status**
Primarily a research and decision‑support tool; used in FireSmart and tactical planning studies rather than as a national operational standard.

---

### Data‑Driven / "Next‑Day" Wildfire Spread Models
{: .text-grey-dk-100 }
**Category:** ML / Hybrid family
{: .fs-3 }

**Origin and stewardship**
Includes hybrid systems like FIREFLY with ensemble Kalman filtering, and more recent deep learning models for next‑day spread prediction developed by academic and applied research groups.

**Simulation methodology**
- *Hybrid DA:* combine a traditional spread solver (e.g., FIREFLY) with reduced‑cost EnKF and polynomial chaos expansions to calibrate parameters and assimilate fire front observations
- *Pure/semi‑pure ML:* train ML models (e.g., random forests, CNNs, generative models) to map from drivers (fuels, weather, topography, prior perimeters) to next‑day burned area or spread extent

**Key capabilities and intended use**
- Reduce computational cost and improve accuracy through sequential DA or learned mappings compatible with operational time windows
- Target regional‑scale spread and next‑day planning rather than fine‑scale physics

**Validation and research use**
Hybrid systems show significant error reductions via assimilation in both synthetic and experimental fires. ML models often match or outperform empirical baselines on held‑out events but remain early‑stage with limited broad operational validation.

**Known limitations**
- Black‑box aspects raise concerns about extrapolation to extremes and non‑stationary climate regimes
- DA systems and ML models rely on frequent, accurate perimeter observations, which are not always available in real time

**Code availability**
Some research codes are public (e.g., FIREFLY and related DA implementations, university GitHubs), others are proprietary or only described in papers.

**Data requirements**
Multi‑temporal fire perimeters or thermal maps, gridded fuels/topography, and weather/reanalysis fields; data volume and quality are key constraints.

**Compute and performance**
Trained ML models typically infer in seconds to minutes on GPUs or CPUs, enabling large ensembles. Hybrid DA systems are heavier but still designed for operationally compatible runtimes at regional scales.

**Operational status**
Mostly research prototypes and case‑study tools; agencies are beginning to explore AI‑enhanced workflows but widespread operational adoption is still emerging.

---

### ELMFIRE (Eulerian Level‑Set Model of FIRE Spread)
{: .text-grey-dk-100 }
**Category:** Front‑propagation
{: .fs-3 }

**Origin and stewardship**
Originally developed under University of Colorado/NCAR (Janice Coen and collaborators) and later extended as a cloud‑native system for real‑time operations.

**Simulation methodology**
Eulerian level‑set fire growth model using Rothermel‑based spread rates on a landscape grid, with automated data assimilation from satellite and other observations. Supports ensemble simulations by perturbing inputs and parameters.

**Key capabilities and intended use**
- Real‑time, cloud‑deployed perimeter prediction with frequent updates, targeting incident support
- Ensemble spread forecasting and probabilistic perimeters over heterogeneous fuels and terrain driven by time‑varying weather

**Validation and research use**
Operational deployments on 100+ fires (e.g., via ALERTWildfire) report perimeter accuracy in the ~65–80% overlap range for many events. Used to test ensemble strategies, data assimilation, and cloud architectures for wildfire prediction.

**Known limitations**
- Semi‑empirical spread core; plume–atmosphere feedbacks and detailed crown dynamics are parameterized
- Sensitive to fuel models, weather inputs, and timeliness/quality of observations

**Code availability**
Core model available as open‑source (e.g., GitHub), with additional cloud orchestration used in specific deployments.

**Data requirements**
Gridded fuels/topography (often LANDFIRE‑derived), NWP weather (HRRR, ECMWF), and active fire detections/perimeters from satellites and cameras for data assimilation.

**Compute and performance**
Typical 6‑hour forecasts complete in ~5–15 minutes on cloud infrastructure, supporting ensembles.

**Operational status**
Operational prototype in systems like ALERTWildfire (CA/NV/OR); illustrative of cloud‑native, ensemble‑capable empirical models.

---

### FARSITE (Fire Area Simulator)
{: .text-grey-dk-100 }
**Category:** Front‑propagation
{: .fs-3 }

**Origin and stewardship**
Developed at USFS Missoula Fire Sciences Laboratory by Mark Finney in the 1990s for spatial fire growth simulation.

**Simulation methodology**
Semi‑empirical front‑propagation using Rothermel surface spread, crown fire and spotting sub‑models, and a minimum‑travel‑time (MTT) algorithm on a gridded landscape.

**Key capabilities and intended use**
- Landscape‑scale fire growth over hours to days under heterogeneous fuels, topography, and time‑varying weather
- Supports planning, incident action planning, and, with extensions, post‑frontal combustion and smoke studies

**Validation and research use**
Case studies and reviews report typical perimeter overlap ~60–75% and timing errors of ±2–4 hours when well configured. Extensively used in research and planning; de facto empirical baseline.

**Known limitations**
- No explicit two‑way fire–atmosphere coupling; plume‑driven events and pyrocumulus are not explicitly captured
- Simplified spotting and crown fire; WUI structure interactions are outside its design

**Code availability**
Closed‑source Windows application; algorithms documented in literature.

**Data requirements**
Landscape files (fuels, canopy, DEM; often LANDFIRE), plus time‑series weather and fuel moistures (RAWS, NWP, forecasts).

**Compute and performance**
Typical 24‑h forecast over ~10,000 ha at ~30 m runs in ~20–60 minutes on a desktop.

**Operational status**
Widely used and integrated into WFDSS and IFTDSS; primary U.S. empirical/semi‑empirical landscape fire growth tool.

---

### FIRETEC
{: .text-grey-dk-100 }
**Category:** CFD / coupled fire–atmosphere
{: .fs-3 }

**Origin and stewardship**
High‑fidelity wildland fire model developed at Los Alamos National Laboratory, coupled with the HIGRAD atmospheric model.

**Simulation methodology**
3D physics‑based CFD solving Navier–Stokes, combustion, heat transfer, and fuel–air interaction on a resolved mesh, with explicit two‑way fire–atmosphere coupling and detailed representation of vegetation.

**Key capabilities and intended use**
- Resolves fine‑scale fire–atmosphere interactions, crown fire initiation, effects of stand structure and thinning, and topographic influences
- Used for fundamental fire science, evaluation of management treatments, and informing parameterizations in simpler models

**Validation and research use**
Validated against experiments such as ICFME and RxCADRE, comparing simulated winds and behavior to observations. Used in many studies of stand structure, beetle‑kill effects, and prescribed fire dynamics.

**Known limitations**
- Extremely computationally expensive; domains typically ≲1 km² and time windows ≲1–2 hours
- Requires detailed fuel and atmospheric initial conditions and major HPC resources and expertise

**Code availability**
LANL software with restricted access; not broadly open‑source.

**Data requirements**
High‑resolution 3D fuel descriptions, terrain, and atmospheric boundary/initial conditions; often from experimental burns.

**Compute and performance**
Simulating ~1 hour of fire over ~1 km² at meter‑scale can require many hours to days on supercomputers.

**Operational status**
Research‑only, used to generate high‑fidelity datasets and understanding; not for real‑time operations.

---

### FlamMap
{: .text-grey-dk-100 }
**Category:** Empirical
{: .fs-3 }

**Origin and stewardship**
Developed at USFS Missoula Fire Sciences Laboratory as a companion to FARSITE for non‑temporal fire behavior mapping.

**Simulation methodology**
Empirical, point‑based fire behavior under steady conditions: applies Rothermel‑based equations independently at each cell to compute fire behavior metrics.

**Key capabilities and intended use**
- Maps potential flame length, spread rate, intensity, and crown fire potential under specified weather and moisture
- Supports burn probability and pre‑season risk analyses via repeated scenario runs

**Validation and research use**
Validation is indirect via the underlying BEHAVE/Rothermel formulations; FlamMap itself is not designed for event‑by‑event perimeter prediction.

**Known limitations**
- No explicit time dimension; cannot predict arrival times or dynamic evolution
- Shares empirical limitations of Rothermel‑based models in extreme or complex WUI regimes

**Code availability**
Closed‑source Windows application with GIS integration.

**Data requirements**
Gridded fuels, canopy, and DEM (often LANDFIRE) plus user‑specified constant weather and moisture scenarios.

**Compute and performance**
Processes large landscapes (50,000+ ha) in minutes on desktops.

**Operational status**
Widely used for strategic planning, fuel treatment design, and long‑term risk assessments.

---

### FSPro (Fire Spread Probability)
{: .text-grey-dk-100 }
**Category:** Front‑propagation / Probabilistic
{: .fs-3 }

**Origin and stewardship**
Developed by USFS and partners as a probabilistic fire spread tool within WFDSS.

**Simulation methodology**
Runs ensembles of FARSITE‑like MTT simulations while sampling from weather, ignition, and parameter uncertainties to estimate the probability of fire reaching each location over a planning horizon.

**Key capabilities and intended use**
- Produces burn probability maps and probability contours used in long‑term incident decision‑making within WFDSS
- Represents weather uncertainty via sampled historical or forecast scenarios

**Validation and research use**
Evaluated in WFDSS case studies with emphasis on decision relevance and calibration, rather than standardized perimeter metrics.

**Known limitations**
- Inherits empirical/MTT limitations; may under‑represent tail behavior in extreme plume‑driven events
- Ensemble sizes limited by computational budget and available weather ensembles

**Code availability**
Implemented within WFDSS; internal code is not open, but methodology is described in documentation and literature.

**Data requirements**
Similar to FARSITE (LANDFIRE landscapes, weather histories/forecasts, RAWS data).

**Compute and performance**
Back‑end servers complete ensembles within tens of minutes to a few hours, supporting operational decision cycles.

**Operational status**
Established part of WFDSS, used broadly for strategic planning and risk assessments on large incidents.

---

### PHOENIX RapidFire
{: .text-grey-dk-100 }
**Category:** Front‑propagation / enhanced spotting & WUI
{: .fs-3 }

**Origin and stewardship**
Developed in Australia by University of Melbourne and partners under Bushfire CRC and subsequent programs; used by Australian agencies such as Victorian fire services.

**Simulation methodology**
Mechanistic, continuous, dynamic, empirically based simulator that integrates fuels, terrain, weather, and suppression with explicit convection and ember transport/ignition modules. Uses perimeter propagation augmented by a deterministic firebrand transport and ignition model.

**Key capabilities and intended use**
- Designed to simulate large, fast‑moving bushfires including ember‑driven spread across discontinuous fuels and WUI exposures
- Produces detailed outputs (flame height, intensity, ember density, asset‑level impacts) for evacuation planning and tactical decisions

**Validation and research use**
Case studies comparing predicted and observed perimeters with metrics such as area difference index (ADI) show good performance when fuel and ember modules are calibrated. Widely used in Australian bushfire risk, mitigation, and WUI modeling research.

**Known limitations**
- Firebrand module originally calibrated for larger‑scale spread; fine‑scale WUI detail may require adjustments
- Fire–atmosphere coupling is parameterized rather than fully resolved

**Code availability**
Licensed software for organizations; not open‑source.

**Data requirements**
High‑resolution Australian fuels and vegetation maps, DEM‑based terrain, detailed weather inputs, and asset layers for structures and infrastructure.

**Compute and performance**
Operational predictions are reported to be produced in minutes, enabling rapid support to fire management.

**Operational status**
Used operationally in several Australian jurisdictions for prediction, warnings, and planning.

---

### Prometheus (Canadian Wildland Fire Growth Simulation Model)
{: .text-grey-dk-100 }
**Category:** Front‑propagation
{: .fs-3 }

**Origin and stewardship**
Canada's national operational wildfire growth simulator, developed by Natural Resources Canada and provincial fire agencies.

**Simulation methodology**
Deterministic front‑propagation model using the Canadian FBP system and elliptical wavelets (Huygens' principle) to evolve fire perimeters.

**Key capabilities and intended use**
- High‑resolution growth forecasts for Canadian fuels using FBP fuel classifications
- Supports suppression strategy evaluation, evacuation planning, and community and forest design

**Validation and research use**
Documentation and case studies report accurate, fast multi‑day forecasts in Canadian landscapes when driven by good inputs. Used widely in research on fire growth and WUI interactions.

**Known limitations**
- Best calibrated for Canadian boreal and montane fuels; other regions require careful fuel mapping
- Like other empirical/FBP tools, does not explicitly resolve extreme plume‑driven or long‑range spotting behavior

**Code availability**
Released as an open tool in recent years with documentation; uses vector front representation and GIS integration.

**Data requirements**
Fuel‑type layers (FBP classes), FWI/FBP inputs, and DEM‑derived slope/aspect.

**Compute and performance**
"Accurate, fast, multi‑day" predictions on standard computers; comparable runtime to FARSITE for similar domains.

**Operational status**
Primary operational simulator for Canadian agencies; widely used in planning and research.

---

### QUIC‑Fire
{: .text-grey-dk-100 }
**Category:** Fast CFD / coupled fire–atmosphere
{: .fs-3 }

**Origin and stewardship**
Developed at LANL with USFS and Tall Timbers as a fast‑running 3D tool for prescribed fire planning and fire–atmosphere studies.

**Simulation methodology**
Couples the rapid 3D wind solver QUIC‑URB with a physics‑based cellular‑automata spread model (Fire‑CA), representing 3D fuels and feedback between fire and atmosphere at lower cost than full CFD.

**Key capabilities and intended use**
- Near‑real‑time 3D simulations of prescribed burns in complex vegetation and terrain
- Intended as a "flight simulator" for fire managers and firefighters to explore ignition patterns and smoke dispersion

**Validation and research use**
Comparisons show strong agreement with FIRETEC in many metrics, indicating that key dynamics can be preserved at reduced cost. Ongoing work includes smoke plume dispersion validation and application to demonstration burns.

**Known limitations**
- Uses rapid wind solver and CA spread, still approximations relative to full CFD, especially in very complex WUI environments
- Designed for prescribed‑fire scales rather than multi‑day regional campaign fires

**Code availability**
LANL software available to partners; not broadly open‑source.

**Data requirements**
3D fuel structure, terrain, and meteorological boundary conditions; often from field campaigns.

**Compute and performance**
Runs on laptops or workstations with near‑real‑time performance for prescribed‑fire domains.

**Operational status**
Research and advanced planning tool; candidate for prescribed‑fire simulators and training, not a national operational standard yet.

---

### Spark / Spark Operational
{: .text-grey-dk-100 }
**Category:** Front‑propagation framework
{: .fs-3 }

**Origin and stewardship**
Developed by CSIRO (Data61) as a flexible simulation framework; Spark Operational is the national operational implementation via AFAC and partners.

**Simulation methodology**
Modular front‑propagation framework that pairs configurable spread‑rate "speed functions" with advanced simulation and ensemble capabilities. Supports thousands of vegetation classes and direct ingestion of weather forecasts.

**Key capabilities and intended use**
- Used for infrastructure planning, land management, fuel reduction planning, tactical resource allocation, evacuation route planning, reconstruction, and ecological fire regime studies
- Spark Operational provides real‑time operational simulations, statistics, and visualizations for Australian agencies

**Validation and research use**
Evaluated by AFAC as part of a national bushfire prediction capability; its model library allows users to encode and test various empirical and semi‑physical spread models.

**Known limitations**
- Physics fidelity depends on chosen speed functions; underlying kernels remain empirical/semi‑empirical
- Coordinating calibration and validation across agencies/fuels is a continuing challenge

**Code availability**
Spark is a software architecture and toolkit with documentation and a model library; Spark Operational is deployed operationally by agencies.

**Data requirements**
Meteorological forecasts, DEM‑based terrain, detailed vegetation/fuel data, and spatial constraints/asset information.

**Compute and performance**
Spark Operational is reported to simulate hours of spread in seconds, supporting real‑time use and ensembles.

**Operational status**
Adopted as Australia's national bushfire simulation capability, integrated into multiple agency workflows.

---

### Technosylva Wildfire Analyst (WFA)
{: .text-grey-dk-100 }
**Category:** Front‑propagation / operational platform
{: .fs-3 }

**Origin and stewardship**
Commercial wildfire modeling and decision‑support platform developed and maintained by Technosylva; used by utilities and agencies in the U.S., Europe, and Latin America.

**Simulation methodology**
Propagation engine built from fire behavior libraries implementing and extending Rothermel‑based surface fire models, crown fire, and spotting, with time‑varying weather and fast perimeter algorithms. Includes modes for backward propagation, ROS adjustment to fit observed perimeters, and calibration against observations.

**Key capabilities and intended use**
- Real‑time and forecast fire spread, arrival times to assets, exposure mapping, and what‑if suppression scenarios for operations
- Reconstruction and calibration of historical fires for risk analysis and model tuning

**Validation and research use**
Published work shows that optimizing fuel‑specific ROS adjustments can significantly reduce arrival‑time and area errors in case studies. WFA is used extensively in utility wildfire risk analyses and PSPS studies.

**Known limitations**
- Semi‑empirical core; plume‑driven extremes still require calibration and may be imperfectly represented
- Proprietary; internal algorithms are only partly visible via documentation and papers

**Code availability**
Proprietary enterprise software; not open‑source.

**Data requirements**
Fuels/vegetation (e.g., LANDFIRE), DEM terrain, high‑resolution weather, and asset data (structures, transmission lines, substations), plus observational perimeters/detections.

**Compute and performance**
Server‑ or cloud‑hosted simulations designed to run in minutes for typical utility territories and incident scales, enabling ensembles.

**Operational status**
Widely used by major U.S. utilities and agencies for risk forecasting, PSPS analysis, and operational spread prediction.

---

### WFDS / FDS (WUI Fire Dynamics Simulator)
{: .text-grey-dk-100 }
**Category:** CFD / WUI
{: .fs-3 }

**Origin and stewardship**
FDS is an open‑source structural fire CFD code developed by NIST; WFDS extends FDS to vegetation and WUI applications in collaboration with USFS.

**Simulation methodology**
LES‑based CFD solving low‑Mach‑number Navier–Stokes with combustion and radiation; WFDS adds vegetation and wildland fuel models, enabling simulation of surface and canopy fires near structures.

**Key capabilities and intended use**
- Detailed modeling of structure ignition, flame attachment, ember accumulation, and radiant/convective heating in WUI settings
- Used for mitigation design, parcel‑scale vulnerability studies, and WUI fire reconstructions

**Validation and research use**
FDS is extensively validated against structural fire experiments; WFDS has more limited but growing validation in WUI and vegetation fire experiments. Widely used in WUI research.

**Known limitations**
- Domain sizes typically <500 m and durations tens of minutes due to computational demand
- Requires detailed geometry and material properties often lacking at scale

**Code availability**
Open‑source distribution by NIST (FDS) with documentation and validation guides; WFDS capabilities are included in certain versions/builds.

**Data requirements**
Detailed structural geometry and materials, vegetation/fuels, and boundary conditions for wind and ambient conditions.

**Compute and performance**
Simulations require hours to days on multi‑core workstations or clusters for tens of minutes of fire time.

**Operational status**
Used in engineering and post‑fire analysis, not in real‑time operations; key source of structure‑scale physics for surrogates.

---

### WRF‑Fire / WRF‑SFIRE
{: .text-grey-dk-100 }
**Category:** Coupled atmosphere–fire
{: .fs-3 }

**Origin and stewardship**
Wildland fire module within the WRF model, developed by NCAR and collaborators (Mandel, Kochanski, USFS partners).

**Simulation methodology**
Two‑way coupled atmosphere–fire system: semi‑empirical surface spread (Rothermel‑type) implemented via level‑set on a refined fire grid, exchanging heat and moisture fluxes with the WRF atmospheric model. Includes optional spotting parameterization.

**Key capabilities and intended use**
- Represents fire‑induced winds, plume dynamics, and feedbacks in complex terrain
- Used in studies of extreme events, vortices, wind reversals, and fire–atmosphere coupling

**Validation and research use**
Numerous case studies show realistic plumes and improved behavior in plume‑dominated events, with reported perimeter overlaps ~75–85% when carefully configured. Widely used in research.

**Known limitations**
- Semi‑empirical spread core; detailed combustion and fine‑scale fuel heterogeneity are parameterized
- Computationally expensive and complex; needs HPC and WRF expertise

**Code availability**
Open‑source as part of WRF; Fortran/MPI code with fire options enabled at build time.

**Data requirements**
Standard WRF atmospheric inputs plus high‑resolution fuels and ignition specifications.

**Compute and performance**
Tens to hundreds of cores typically needed; 6‑h simulations can take 2–4 h of wall‑clock time for common configurations.

**Operational status**
Research and research‑operational pilots; not routine daily operations due to cost/complexity.

---

## 3. High‑Level Comparison Tables

### 3.1 Landscape Empirical and Front‑Propagation Models

| Model | Category | Physics Core | Typical Scale | Code | Compute | Operational Role |
|:--|:--|:--|:--|:--|:--|:--|
| BEHAVE / BehavePlus | Empirical | Rothermel‑based | Point / steady‑state | Closed | Instant | Training, planning |
| FBP System | Empirical | FBP equations | Point / steady‑state | Public | Instant | Canadian prediction |
| FARSITE | Front‑prop | Rothermel + MTT | ~30 m / hours–days | Closed | 20–60 min/24h | U.S. incident support |
| FlamMap | Empirical | Rothermel | ~30 m / steady‑state | Closed | Minutes | Planning, burn prob. |
| FSPro | Probabilistic MTT | FARSITE + ensembles | ~30 m / multi‑day | WFDSS | Mins–hours | Strategic planning |
| Prometheus | Front‑prop | FBP + wavelets | 10–100 m / hours–days | Open | Similar to FARSITE | Canadian operations |
| PHOENIX RapidFire | Front‑prop + spotting | Empirical + ember | 10–100 m / hours–days | Licensed | Minutes | Australian ops, WUI |
| ELMFIRE | Level‑set + DA | Rothermel + level‑set | 30–90 m / hours | Open core | 5–15 min/6h | Cloud prototype |
| Cell2Fire | Cell‑based | FBP kernels | 10–100 m / hours–days | Open‑source | Parallel; efficient | Research / planning |
| Spark Operational | Framework | User‑defined | 10–100 m / hours–days | Framework | Seconds–minutes | Australian national |
| Wildfire Analyst | Front‑prop | Rothermel + libs | 10–60 m / hours–days | Proprietary | Minutes | Utility/agency ops |

### 3.2 Coupled and CFD/WUI Models

| Model | Category | Physics Fidelity | Domain / Resolution | Runtime | Primary Use |
|:--|:--|:--|:--|:--|:--|
| WRF‑Fire | Coupled NWP+fire | Semi‑empirical + LES winds | 10–200 m atmos / 10–30 m fire | Slower than real‑time | Fire–atmosphere research |
| FIRETEC | CFD | Full 3D CFD + combustion | ≲1 km² / 1–10 m | Much slower | Fundamental physics |
| QUIC‑Fire | Fast CFD hybrid | Fast wind + CA fire | Prescribed‑burn / meters | Near real‑time | Prescribed fire planning |
| WFDS / FDS | CFD / WUI | 3D CFD with WUI fuels | ≲500 m / 0.5–5 m | Much slower | WUI ignition, forensics |

---

## 4. References

### General Reviews and Inventories

1. Wainer, G., et al. "A Comparative Review on Wildfire Simulators." (Conference paper)
2. Johnston, J., et al. "Fire behaviour and smoke modelling." *Current Forestry Reports*
3. NRC Canada. "A critical review of wildfire models and simulation tools for WUI fires." *Fire Safety Journal*, 2024
4. EPRI. "Wildfire Risk Tool Inventory and Evaluation."
5. Rural Fire Research (NZ). "Review of Fire Growth Simulation Models for Application in New Zealand." 2013

### BEHAVE / BehavePlus

6. Andrews, P. L. "BEHAVE: Fire Behavior Prediction and Fuel Modeling System." USDA Forest Service Gen. Tech. Rep. INT‑194, 1986
7. Andrews, P. L., Bevins, C. D., & Seli, R. C. "BehavePlus Fire Modeling System, Version 3.0: User's Guide." USDA Forest Service, RMRS‑GTR‑106, 2003
8. Andrews, P. L., et al. "Validation of BEHAVE fire behavior predictions in oak savannas." *Int. J. Wildland Fire*

### Canadian FBP System

9. Forestry Canada Fire Danger Group. "Development and Structure of the Canadian Forest Fire Behavior Prediction System." 1992
10. Natural Resources Canada. "Canada's Fire Behaviour Prediction System."
11. NWCG. "CFFDRS: Fire Behavior Prediction FBP System."

### FARSITE / FlamMap / FSPro

12. Finney, M. A. "FARSITE: A Fire Area Simulator for Fire Managers." USDA Forest Service, RMRS‑RP‑4, 1998
13. Finney, M. A. "An Overview of FlamMap Fire Modeling Capabilities." *FHTET 2006‑19*
14. WFDSS documentation (Fire Spread Probability – FSPro component)

### Prometheus

15. Tymstra, C., et al. "Development and Structure of Prometheus." Natural Resources Canada, NOR‑X‑417E, 2010

### PHOENIX RapidFire

16. Tolhurst, K. G., et al. "PHOENIX RapidFire: A bushfire prediction system." Bushfire CRC
17. Pugnet, L., et al. "Wildland–urban interface fire modelling using PHOENIX RapidFire." MODSIM 2013

### Spark

18. CSIRO. "Spark: Predicting bushfire spread."
19. AFAC. "Fire prediction simulators."

### Cell2Fire

20. Pais, S., et al. "Cell2Fire: A Cell-Based Forest Fire Growth Model." *Frontiers in Forests and Global Change* 4, 2021
21. Cell2Fire GitHub repository

### Wildfire Analyst

22. Technosylva. "Models Implemented in Wildfire Analyst Enterprise."
23. SDG&E. "Wildfire Analyst™ Enterprise Models & Inputs." 2022

### WRF‑Fire

24. NCAR/MMM. "WRF for Wildland Fire (WRF‑Fire)."
25. Mandel, J., et al. "Coupled atmosphere–wildland fire modeling with WRF 3.3 and SFIRE." *Geosci. Model Dev.* 4, 591–610, 2011

### FIRETEC and QUIC‑Fire

26. Linn, R., et al. "Using FIRETEC to further our understanding of fire science."
27. Linn, R., et al. "QUIC-Fire: A fast-running simulation tool for prescribed fire planning." *Environ. Model. Softw.* 123, 2019

### WFDS / FDS

28. NIST. "Fire Dynamics Simulator (FDS) and Smokeview."
29. NIST/USFS. WFDS documentation and WUI application notes

### Data‑Driven Models

30. Rochoux, M. C., et al. "Towards predictive data-driven simulations of wildfire spread." *Nat. Hazards Earth Syst. Sci.* 14, 2951–2973, 2014
