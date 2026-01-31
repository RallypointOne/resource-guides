---
layout: default
title: ML Downscaling for Naval Operations
nav_order: 2
description: "Survey of machine learning architectures for high-resolution environmental forecasting supporting Navy SBIR N252-105"
parent: Home
has_toc: true
---

# High-Resolution Environmental Forecasting  
## A Survey of Machine Learning Downscaling Architectures 

Prepared by RallyPoint One LLC in support of phase 1 feasibility study for Navy SBIR N252-105: Machine Learning Downscaling Capability for Environmental Forecasts

---

The contemporary transition of the United States Marine Corps and Navy from an industrial-age framework to an information-age learning and operational model necessitates a fundamental shift in how environmental intelligence is generated and consumed.[^1] As articulated in the Training and Education 2030 strategic vision, the modernization of the force requires not only advanced platforms but also the cognitive and digital tools to manage those platforms in complex, high-stakes environments.[^1] A critical component of this modernization is the capability to generate skillful, near real-time environmental forecasts that provide tactical advantages through superior local-scale fidelity.[^2] The Department of the Navy (DON) Small Business Innovation Research (SBIR) topic N252-105 seeks to address a profound technological gap: the disconnect between the predictive success of global-scale physics and the lack of forecast fidelity at the local or tactical scale, specifically at resolutions below 1 kilometer.[^2]

The operational environment for Sailors and Marines is defined by the interaction of atmospheric, oceanic, and cryospheric processes that occur at scales far smaller than what traditional global models can resolve. Current Machine Learning Weather Prediction (MLWP) and numerical systems often fail to capture the nuances of the atmospheric boundary layer or the upper ocean, where vertical resolutions of approximately 10 meters are required to inform tactical decision aids.[^2] To capitalize on the intellectual capacity of small business concerns, the DON SBIR program facilitates the development of innovative solutions that meet these specific research and development needs.[^3] The ultimate objective is to arm the force with advanced technologies that provide an unmatched advantage against current and future adversaries in contested environments.[^3]

## Technical Objectives and the Resolution Gap in Tactical Forecasting

The primary objective of SBIR N252-105 is the development of an artificial intelligence (AI)-aided capability to generate environmental forecasts of the atmosphere, ocean, sea ice, and ionosphere at significantly higher spatial horizontal and vertical resolutions than are currently available.[^2] While global climate models (GCMs) provide essential information on large-scale variability, their coarse spatial resolution—typically around 100 km—limits their utility for regional or installation-specific assessments.[^4][^5] Dynamic downscaling, which involves nesting high-resolution regional models within global models, is physically grounded but carries a prohibitive computational cost and requires intensive post-processing bias correction.[^5][^6] In contrast, empirical and statistical downscaling methods, particularly those leveraging machine learning, offer several orders of magnitude greater computational efficiency, enabling the downscaling of large ensembles to quantify uncertainty.[^6][^7]

The gap in current forecasting capability is most visible at the local scale, where terrain-induced phenomena, coastal winds, and tropical cyclone surge effects dominate the tactical picture.[^2] Traditional models often rely on parameterization schemes to represent sub-grid scale processes, which are a major source of uncertainty.[^8] The Navy seeks a solution that goes beyond existing commercial and open-source efforts to create an AI-enabled suite of software capable of accepting multi-modal inputs—ranging from text and historical data to real-time satellite imagery—and outputting high-fidelity forecasts.[^1][^2]

| Forecast Scale | Horizontal Resolution | Typical Model Type | Military Utility |
|:--|:--|:--|:--|
| Global / Strategic | > 10 km | GCM / NAVGEM | Theater Planning |
| Regional / Operational | 1 km - 10 km | RCM / WRF | Fleet Operations |
| Tactical / Local | < 1 km | SBIR N252-105 Goal | Small Unit / Amphibious |
| Microscale | < 100 m | LES / CFD | UAS / Special Ops |

As indicated in the table above, the N252-105 requirement targets the "tactical/local" scale, which is essential for maritime security, tropical cyclone tracking, and navigation through sea ice.[^2] The system must be globally relocatable, meaning it must be able to generate these forecasts at any worldwide location regardless of the underlying grid size or resolution of the available coarse data.[^2] This "resolution-free" requirement points toward continuous modeling frameworks that do not depend on fixed discretized grids for their internal representations.[^9]

## Machine Learning Architectures for Environmental Super-Resolution

The technical core of the proposed solution must leverage state-of-the-art architectures in generative AI and deep learning. Because downscaling is inherently an underdetermined problem—where many high-resolution states are physically consistent with a single low-resolution state—simple interpolation is insufficient.[^7][^10] The mapping from low-resolution (LR) to high-resolution (HR) paired climate fields requires the ability to capture complex, non-Gaussian distributions and spatial dependencies.[^7][^11]

### Generative Adversarial Networks (GANs) and Variational Frameworks

Generative Adversarial Networks (GANs) have emerged as a dominant methodology for drawing realizations from high-dimensional distributions in weather and climate data.[^7] A GAN framework for downscaling typically involves a generator network that attempts to create plausible high-resolution counterfeits of the training data and a discriminator or "critic" network that learns to distinguish these counterfeits from the truth.[^7] For environmental applications, the conditional GAN (cGAN) is often employed, where the generator is provided with the low-resolution forecast as a conditional input.[^12]

Research indicates that cGANs can simultaneously correct biases in coarse global meteorological forecasts and super-resolve them into high-target spatial resolutions.[^12] This dual functionality is achieved through a multi-stage training process involving separate loss functions for the bias-correction component and the super-resolution component.[^12] The inclusion of contextual meteorological fields, such as total column water or convective available potential energy (CAPE), allows the model to maintain physical consistency even in the presence of extreme events.[^12]

### Diffusion Models and Meso-scale Recovery

While GANs are successful in many generative tasks, their application in sea surface temperature (SST) and oceanographic downscaling is increasingly being augmented or replaced by Diffusion Models (DMs).[^10] Diffusion models generate high-resolution results by learning to reverse a multi-step corruption process, which has been shown to produce more vivid and realistic mesoscale dynamic features compared to baseline neural networks.[^10] For instance, the DIFFDS model is designed specifically to obtain high-resolution versions of input SST and restore mesoscale processes that are otherwise missing in coarse satellite products.[^10] This capability is critical for naval operations because ocean temperature anomalies and mesoscale eddies directly influence acoustic propagation and sonar performance.[^13][^14]

### Transformer Backbones and Foundation Models

The emergence of transformer-based "Weather Foundation Models" (WFMs) such as ClimaX, Aurora, and GraphCast has revolutionized the field by demonstrating that a single backbone pre-trained on petabyte-scale climate archives can surpass global numerical weather prediction (NWP) skill.[^15][^16] These models use a Generative Forecasting Transformer (GFT) architecture that can be adapted for diverse tasks, including regional downscaling and hyperlocal forecasting for energy infrastructure.[^15] By inheritance, a model developed for SBIR N252-105 would benefit from a foundation-model paradigm, where pre-training on heterogeneous climate data is followed by fine-tuning for specific Navy and Marine Corps use cases, such as rime ice detection or tropical cyclone wind effects.[^15]

| Model Type | Key Advantage | Implementation Context |
|:--|:--|:--|
| GAN | Captures extremes and textures | Precipitation nowcasting |
| Diffusion | Superior mesoscale restoration | Ocean SST/Dynamics |
| Transformer | Long-range spatial dependencies | Global-to-Local adaptation |
| CNN | Local feature extraction efficiency | Temperature/Soil Moisture |

### Physics-Informed and Physics-Guided Frameworks

A persistent challenge in applying deep learning to environmental forecasting is the risk that data-driven models may ignore fundamental physical laws, such as conservation of mass, energy, or momentum.[^9][^17] To foster trust among naval forecasters, it is essential that the predictions align with the governing dynamics of the atmosphere and ocean.[^2][^9]

### Physics-Informed Neural Networks (PINNs) and PhyDL-NWP

Physics-Informed Neural Networks (PINNs) provide a methodology for integrating existing physical knowledge directly into the architecture and training process of the model.[^8] The PhyDL-NWP framework, proposed as a physics-guided deep learning paradigm, integrates physical equations with latent force parameterization into data-driven models.[^9][^18] This framework allows for the prediction of weather variables from arbitrary spatiotemporal coordinates and computes physical terms through automatic differentiation.[^9]

The residual of the partial differential equations (PDEs) that describe meteorological dynamics is used as a "physics-informed loss" to constrain the optimization of the neural network weights.[^9][^19] This design enables resolution-free downscaling, where the model essentially acts as a continuous function of space and time.[^9] By aligning predictions with governing dynamics, PhyDL-NWP has demonstrated the ability to achieve up to 170x faster inference than traditional NWP while maintaining physical consistency across global and local scales.[^9][^19]

### Latent Force Parameterization and Hybrid Modeling

In traditional NWP, sub-grid processes that cannot be explicitly resolved—such as radiation, precipitation, or turbulence—are represented by semi-empirical parameterization schemes.[^9][^20] These schemes are a major source of model uncertainty.[^8] Machine learning offers an alternative by learning these parameterizations directly from high-resolution observations or reanalysis data.[^17][^21] The concept of "soft AI" versus "hard AI" distinguishes between the targeted insertion of ML within a physical model and the complete replacement of the physical model by a surrogate emulator.[^21][^22]

For the Navy, a hybrid approach that maintains the robust "dynamical core" of an NWP model while using ML for the "downscaling phase" of production is highly desirable.[^2][^23] For example, downscaling GraphCast AI forecasts using the Weather Research and Forecasting (WRF) model has shown promise in predicting downslope windstorms and other high-impact events.[^23]

## Atmospheric Domain: Boundary Layers and Extreme Events

The atmospheric boundary layer (ABL) is the theater where tactical operations are conducted, from aircraft carrier landings to unmanned aerial vehicle (UAV) missions. SBIR N252-105 specifically highlights the need for high-fidelity vertical resolution (~10 m) in the ABL.[^2]

### Precipitation and Extreme Storm Realization

Machine learning has proven highly effective in the spatial downscaling of precipitation, which is one of the most difficult variables to forecast due to its intermittent and multi-scale nature.[^11][^24] Models such as DeepSD and ResDeepD use stacked super-resolution convolutional neural networks to downscale daily precipitation from 1 degree (~100 km) to as fine as 0.25 degrees, outperforming traditional methods like Bias Correction Spatial Disaggregation.[^11][^24]

For extreme tornadic storm events, research has demonstrated that convective-permitting models with high-resolution grid spacing (e.g., 4 km) can resolve complex dynamics such as the strength of the subtropical jet versus the polar jet, which influences regional moisture transport and heavy precipitation.[^25][^26] The ability of machine learning to learn the statistical relationships between these large-scale environmental variables and sub-grid cloud characteristics allows for the prediction of intense storm formation even in data-sparse regions.[^4]

### Tropical Cyclones and Surge Effects

A major gap in tactical environmental forecasting is the disconnect between the predictability of global-scale cyclone tracks and the lack of fidelity in local surge and wind effects.[^2] The Joint Typhoon Warning Center (JTWC) and the Fleet Numerical Meteorology and Oceanography Center (FNMOC) are responsible for issuing these warnings, relying on models like NAVGEM and NAVOCEANO's oceanographic products.[^27] High-resolution ML downscaling can bridge this gap by synthesizing coarse forecast fields with high-resolution bathymetry and topography to better inform the "last mile" of a storm's impact on coastal installations.[^2]

| Atmospheric Process | Required Scale | Technical Challenge | Tactical Impact |
|:--|:--|:--|:--|
| Boundary Layer Turbulence | ~10 m (Vertical) | Gray zone parameterization | Flight Safety / UAS |
| Tropical Cyclone Surge | < 1 km (Horizontal) | Bathymetry integration | Base Resilience |
| Precipitation Extremes | < 1 km (Horizontal) | Non-linear dynamics | Logistics / Mobility |
| Cloud Visibility | Microscale | Complex microphysics | Target Acquisition |

## Oceanic Domain: Mesoscale Eddies and Sub-Surface Dynamics

The naval interest in the ocean extends from the surface to the seabed. Accurate forecasting of sea surface temperature (SST), ocean currents, and mesoscale eddies is vital for acoustic propagation, which governs submarine detection and anti-submarine warfare (ASW).[^13][^14]

### Mesoscale Eddy Detection and Tracking

Oceanic mesoscale eddies, with spatial scales between 20 and 200 km, are the primary mechanism for the transport of heat, salt, and carbon across the global ocean.[^14] These features act as dynamic thermal reservoirs that dominate the evolution of the climate system and significantly influence energy and matter transport.[^13][^28] Traditional detection methods rely on sea surface height anomalies from satellite altimetry but often require manual thresholding and heavy calculation.[^14][^29]

Deep learning architectures such as OEDNet and DUNet (Dual U-Net) have been developed specifically for mesoscale eddy identification and positioning.[^13][^29] These models achieve pixel-level segmentation accuracy exceeding 93%, even in "harsh sea states" where traditional algorithms struggle with "ghost eddies" or complex surface signatures.[^29] By framing eddy detection as a cross-domain challenge, researchers have validated the use of domain adaptation techniques to ensure the models remain robust across different ocean basins, such as the South China Sea and the Southern Atlantic Ocean.[^29]

### SST Recovery and Meso-scale Restoration

High-resolution oceanic data is increasingly required for digital twin platforms.[^10] However, existing SST products often fail to meet the sub-kilometer resolution requirements for tactical applications. Diffusion models like DIFFDS have demonstrated the ability to generate high-resolution versions of SST data that are visually comparable to the ground truth and restore missing mesoscale processes.[^10] This generative capability is essential for simulating the thermal extremes concentrated within the proximity of eddy centers, which can have temperature anomalies of 1.2 to 1.4 °C.[^14]

## Cryospheric Domain: Sea Ice Navigation and SAR Downscaling

The Arctic region is becoming an increasingly contested environment, making timely and accurate classification of sea ice types essential for maritime safety and shipping routes.[^30] Traditional ice charting is a manual, repetitive process where trained analysts review gigabytes of Synthetic Aperture Radar (SAR) imagery.[^31]

### Automated Sea Ice Mapping

Machine learning and deep learning (DL) have emerged as powerful tools for automating sea ice parameter estimation.[^32] Models like Ice-Unet, optimized through transfer learning and multi-scale feature fusion, achieve leading Intersection over Union (IoU) scores of 95% in classifying ice, melt ponds, and ships.[^33] These models establish a sub-meter resolution methodology that significantly enhances the precision of ship navigation through real-time monitoring of ice lead morphology.[^33]

The IceBench framework provides a standardized benchmark for evaluating deep learning models for sea ice classification, focusing on the transferability of models across seasons and locations.[^30] This is critical for the "globally relocatable" requirement of SBIR N252-105, as Arctic conditions vary significantly between the Nordic Seas and the Beaufort Sea.[^14][^30]

### Multi-Sensor Fusion and Resolution Improvement

While SAR imagery provides high-resolution spatial patterns, its backscatter intensities do not always distinguish between open sea and certain ice surfaces.[^32] Techniques such as SAR variable downscaling and spatial-temporal encoding allow multi-task models like MMSeaIce to improve mapping accuracy by integrating brightness temperature data and other satellite inputs.[^32] Furthermore, the IceNet project has demonstrated that sea ice can be forecasted weeks or months in advance directly from past conditions and meteorological observations, reducing the computational burden of traditional physics-based models.[^31]

| Cryosphere Variable | Observation Method | Resolution Enhancement | Navigational Utility |
|:--|:--|:--|:--|
| Ice Concentration | SAR / Passive Microwave | Multi-sensor Fusion | Route Planning |
| Ice Type (First/Multi-year) | SAR Dual-Polarized | Deep Learning / U-Net | Hull Integrity |
| Melt Pond Evolution | UAV Optical / High-res SAR | Sub-meter downscaling | Tactical Mobility |
| Ice Edge Circulation | Altimetry / Infrared | Mesoscale Restoration | Operational Stealth |

## Space Weather: Ionospheric TEC and HF Communication

The ionosphere—the region of the atmosphere ranging from 60 to 1000 km—is critical for high-frequency (HF) radio and GNSS applications.[^34][^35] Ionospheric disturbances can cause significant delays in satellite signals and disrupt communications.[^36][^37]

### Prediction of TEC and Ionospheric Parameters

The Total Electron Content (TEC) and the critical frequency of the F2 layer (foF2) are primary parameters for describing the state of the ionosphere.[^35] Machine learning models using support vector machines (SVM), random forest (RF), and back-propagation neural networks (BPNN) have been developed to estimate these parameters with greater accuracy than empirical models like the International Reference Ionosphere (IRI-2020).[^35] Research indicates that RF models, in particular, perform significantly better in foF2 estimation, reducing RMSE by up to 38% compared to traditional benchmarks.[^35]

### Forecasting Large-Scale Travelling Ionospheric Disturbances (LSTIDs)

LSTIDs are wave-like fluctuations triggered by geomagnetic storms that play a critical role in space weather dynamics.[^38] Machine learning frameworks based on gradient boosting (e.g., CatBoost) can forecast the occurrence of LSTIDs over continents like Europe up to three hours in advance.[^38] These models incorporate diverse inputs, including solar wind activity, geomagnetic indices, and ionosonde measurements, to provide real-time alerts for space weather events.[^38] For the Navy, incorporating such models into GNSS receivers can provide real-time estimates of signal delay and improve position accuracy in contested electromagnetic environments.[^35]

## Interoperability and Military Software Standards

For the technology created under SBIR N252-105 to be transitionable, it must be developed as a non-proprietary, affordable, and scalable solution that interacts with existing system specifications.[^1] The Department of the Navy emphasizes the use of open-architecture frameworks to ensure that heterogeneous data sources and AI models can work together seamlessly.[^1][^27]

### Joint METOC Broker Language (JMBL) and JMCDM

The Joint METOC Conceptual Data Model (JMCDM) was created in 1995 to integrate the geophysical data requirements of all Department of Defense (DoD) components, addressing a chronic lack of interoperability between Navy and Air Force systems.[^39] The Joint METOC Broker Language (JMBL) provides an XML representation of this model, establishing a single interface for requesting and retrieving METOC data.[^39][^40]

The JMBL schema is verbose but provides a standardized structure for requests and responses, allowing Tactical Decision Aid (TDA) developers to connect to multiple data sets through a single application programming interface (API).[^39] This framework is critical for "one theater, one forecast" concepts, where diverse inputs from terrestrial and satellite sensors must be assembled into a unified database.[^41][^42] Future development under N252-105 should adhere to JMBL standards to facilitate its integration into the Joint METOC Data Services Framework (JMDSF).[^39][^43]

### Sensor Open Systems Architecture (SOSA) and FACE

The Sensor Open Systems Architecture (SOSA) is a multi-service initiative to develop open architecture standards for military sensor systems.[^44][^45] While SOSA primarily addresses hardware and software for radar, electronic warfare (EW), and communications, its principles of modularity and interoperability are increasingly applied to meteorological software systems.[^44][^46] The Future Airborne Capability Environment (FACE) technical standard further supports this goal by reducing the integration effort for software reuse across multiple platforms.[^47]

For naval vessels and aircraft operating in harsh environments, shipboard electronics must comply with rigorous military standards, such as:

- **MIL-DTL-901E:** High-impact shock testing to ensure equipment survivability.[^45]
- **MIL-STD-167-1A:** Mechanical vibration testing for shipboard environments.[^45]
- **MIL-STD-810E:** Salt fog testing to protect against corrosion from saline air and sea spray.[^45]

| Standard | Focus Area | Relevance to SBIR N252-105 |
|:--|:--|:--|
| JMBL | Data Brokerage / Interoperability | Standard interface for forecast delivery |
| JMCDM | Logical Data Modeling | Consistency across Navy/AF systems |
| SOSA | Open Sensor Architecture | Integration with maritime sensor grids |
| FACE | Software Portability / Reuse | Multi-platform deployment (Ship/Air) |
| JMV 3.0 | Binary Data Format | Tropical cyclone tracking and reporting |

## Data Management and Formats: NetCDF, GRIB2, and BUFR

Environmental data is generated in massive volumes and diverse formats, creating challenges for data sharing, handling, and input/output (I/O).[^16] To resolve these challenges, the Navy and other meteorological agencies rely on established standards:

- **GRIB2 (General Regularly-distributed Information in Binary form):** The primary format for gridded forecast products.[^48][^49]
- **BUFR (Binary Universal Form for the Representation of meteorological data):** Used for non-gridded observational data.[^49][^50]
- **NetCDF (Network Common Data Form):** A self-describing, machine-independent data format used for multi-dimensional arrays, particularly in oceanography and climate research.[^48][^50]

The transition to high-resolution (kilometer-scale) modeling creates "exascale" challenges in data handling.[^51] Strategies to reduce data volumes include "streaming" output to temporary storage, minimal output sets, and advanced compression algorithms.[^51] Developers of ML downscaling capabilities must ensure their software can ingest these standard formats and output JMBL-compliant XML or binary streams to meet the time constraints of the decision cycle.[^39][^40]

## Emerging Technologies: Exascale, Digital Twins, and Quantum

The long-term trajectory for naval environmental forecasting involves the fusion of ML models with exascale computing and the emergence of environmental digital twins.

### Exascale Computing and Data Handling

Reaching kilometer-scale resolution in global earth system models (ESMs) will require systems with millions of compute cores.[^16][^51] This transition poses challenges in energy consumption and carbon footprint, prompting a need to balance algorithmic efficiency with data flow considerations.[^16] Machine learning models, which use less than 5% of traditional processor capabilities when implemented inefficiently, must be optimized to exploit next-generation exascale architectures.[^16]

### Digital Twin Ocean (DTO) and Glider Optimization

The Digital Twin Ocean is a near real-time virtual representation of the ocean that integrates observations, AI, and advanced modeling on high-performance computers.[^53][^54] An international initiative, the DTO aims to empower governments and scientific experts to become partners in knowledge generation.[^53] In the naval context, an interoperable Digital Twin (DT) can be used to optimize ocean glider observations, maximizing their impact on ocean models and weather forecasts.[^55] This creates a "virtuous feedback circle" where the observing capability and the ocean model data assimilation inform each other in near real-time.[^55]

### Quantum Machine Learning for Climate Anomalies

Quantum computing shows promise in addressing climate change impacts and managing expansive solution spaces.[^56] While traditional ML methods struggle with growing complexities and prolonged training times, quantum machine learning (QML) techniques, such as Quantum Support Vector Classifiers (QSVC), have the potential to substantially reduce computational complexity.[^56] Initial studies using 127-qubit IBM quantum computers on NASA satellite data have explored the feasibility of detecting climate anomalies, though the field remains in its nascent stages for operational weather forecasting.[^56]

## Strategic Conclusion and Path Forward

The development of a Machine Learning Downscaling Capability for Environmental Forecasts under Navy SBIR N252-105 is a high-priority effort that aligns with the broader DoD strategy for climate resilience and tactical modernization.[^2][^5] By leveraging advances in generative AI, physics-informed neural networks, and foundation models, the Navy can bridge the critical gap in local-scale atmospheric, oceanic, and space weather intelligence.

The successful transition of this technology will depend on its ability to:

- Achieve horizontal resolutions below 1 km and vertical resolutions of 10 m in the ABL.[^2]
- Ensure physical consistency through the integration of governing dynamics in the ML loss functions.[^9]
- Adhere to open-architecture standards like JMBL, SOSA, and FACE for seamless enterprise integration.[^39][^45]
- Operate effectively in forward-deployed, limited compute environments.[^2]

As environmental challenges in the maritime and Arctic domains intensify, the ability to rapidly and accurately resolve the "tactical mile" of weather and oceanography will serve as a cornerstone of naval operational advantage. The synthesis of human expertise with AI-enabled downscaling provides the most promising pathway to achieving this "unmatched advantage" for the Sailors and Marines of the 21st century.[^1][^3]

---

## References

[^1]: [Generative Artificial Intelligence for Course and Content Creation and Conversion (GenAI4C) - SBIR](https://www.sbir.gov/topics/11994)

[^2]: [Machine Learning Downscaling Capability for Environmental Forecasts - SBIR N252-105](https://www.sbir.gov/topics/11987)

[^3]: [SBIR-STTR Overview - NAVAIR](https://www.navair.navy.mil/sites/g/files/jejdrs536/files/document/%5Bfilename%5D/SBIR-STTR%20Overview.pdf)

[^4]: [Using machine learning to downscale coarse-resolution environmental variables - ResearchGate](https://www.researchgate.net/publication/395402523_Using_machine_learning_to_downscale_coarse-resolution_environmental_variables_for_understanding_the_spatial_frequency_of_convective_storms)

[^5]: [Climate Data Standards and Tool Usability Assessments for ESTCP Climate Resilience - DTIC](https://apps.dtic.mil/sti/trecms/pdf/AD1216790.pdf)

[^6]: [Enhancing Regional Climate Downscaling through Advances in Machine Learning - AMS Journals](https://journals.ametsoc.org/view/journals/aies/3/2/AIES-D-23-0066.1.pdf)

[^7]: [Capturing Climatic Variability: Using Deep Learning for Stochastic Downscaling - AMS Journals](https://journals.ametsoc.org/view/journals/aies/aop/AIES-D-24-0044.1/AIES-D-24-0044.1.pdf)

[^8]: [Physics-Guided Learning of Meteorological Dynamics for Weather Downscaling and Forecasting - ResearchGate](https://www.researchgate.net/publication/394261011_Physics-Guided_Learning_of_Meteorological_Dynamics_for_Weather_Downscaling_and_Forecasting)

[^9]: [Physics-Guided Learning of Meteorological Dynamics for Weather Downscaling and Forecasting - arXiv](https://arxiv.org/html/2505.14555v1)

[^10]: [Spatial Downscaling of Sea Surface Temperature Using Diffusion Model - MDPI](https://www.mdpi.com/2072-4292/16/20/3843)

[^11]: [Physics-Guided Learning of Meteorological Dynamics - ResearchGate](https://www.researchgate.net/publication/391911819_Physics-Guided_Learning_of_Meteorological_Dynamics_for_Weather_Downscaling_and_Forecasting)

[^12]: [US Patent 11880767 B2 - Bias Correction and Super-Resolution](https://patentimages.storage.googleapis.com/2e/51/a6/223bbf4600d2f6/US11880767.pdf)

[^13]: [Oceanic Mesoscale Eddy Detection Method Based on Deep Learning - ResearchGate](https://www.researchgate.net/publication/335237079_Oceanic_Mesoscale_Eddy_Detection_Method_Based_on_Deep_Learning)

[^14]: [Recent advances in observing mesoscale ocean dynamics with satellite altimetry - ResearchGate](https://www.researchgate.net/publication/251545975_Recent_advances_in_observing_mesoscale_ocean_dynamics_with_satellite_altimetry)

[^15]: [A Weather Foundation Model for the Power Grid - arXiv](https://arxiv.org/html/2509.25268v1)

[^16]: [Exascale Computing and Data Handling: Challenges and Opportunities for Weather and Climate Prediction - ResearchGate](https://www.researchgate.net/publication/374505850_Exascale_Computing_and_Data_Handling_Challenges_and_Opportunities_for_Weather_and_Climate_Prediction)

[^17]: [Hard-Constrained Deep Learning for Climate Downscaling - JMLR](https://www.jmlr.org/papers/volume24/23-0158/23-0158.pdf)

[^18]: [Physics-Guided Learning of Meteorological Dynamics - arXiv v2](https://arxiv.org/html/2505.14555v2)

[^19]: [Physics-Guided Learning of Meteorological Dynamics - arXiv Abstract](https://arxiv.org/abs/2505.14555)

[^20]: [Applying Machine Learning in Numerical Weather and Climate Modeling Systems - MDPI](https://www.mdpi.com/2225-1154/12/6/78)

[^21]: [Crafting the Future: Machine learning for ocean forecasting - Copernicus](https://sp.copernicus.org/articles/5-opsr/22/2025/)

[^22]: [Crafting the Future: Machine learning for ocean forecasting (PDF) - Copernicus](https://sp.copernicus.org/articles/5-opsr/22/2025/sp-5-opsr-22-2025.pdf)

[^23]: [Hybrid Numerical Weather Prediction: Downscaling GraphCast AI Forecasts - AMS Journals](https://journals.ametsoc.org/view/journals/wefo/40/1/WAF-D-24-0097.1.xml)

[^24]: [Publications - SDS Lab](https://sdslab.io/publications/)

[^25]: [The Realization of Extreme Tornadic Storm Events under Future Anthropogenic Climate Change - ResearchGate](https://www.researchgate.net/publication/301538118_The_Realization_of_Extreme_Tornadic_Storm_Events_under_Future_Anthropogenic_Climate_Change)

[^26]: [Useful Prediction of Climate Extreme Risk for Texas-Oklahoma at 4-6 Years - DTIC](https://apps.dtic.mil/sti/trecms/pdf/AD1229797.pdf)

[^27]: [Naval Meteorology and Oceanography Command](https://www.metoc.navy.mil/)

[^28]: [Global Climate Models and Their Limitations - Atmospheric Science Research](https://weather.missouri.edu/gcc/09-09-13%20Chapter%201%20Models.pdf)

[^29]: [DUNet: Dual U-Net Architecture for Ocean Eddies Detection and Tracking - ResearchGate](https://www.researchgate.net/publication/378169767_DUNet_Dual_U-Net_Architecture_for_Ocean_Eddies_Detection_and_Tracking)

[^30]: [IceBench Introduction - arXiv](https://arxiv.org/html/2503.17877v1)

[^31]: [Machine learning can help us understand the cryosphere - EGU Blogs](https://blogs.egu.eu/divisions/cr/2024/11/08/did-you-know-machine-learning-can-help-us-understand-the-cryosphere/)

[^32]: [MMSeaIce: improving sea ice mapping with a multi-task model - The Cryosphere](https://tc.copernicus.org/articles/18/1621/2024/)

[^33]: [Ice-Unet: A Very High-Resolution UAV-Optimized Deep Learning Model for Sea Ice Classification - ResearchGate](https://www.researchgate.net/publication/393113455_Ice-Unet_A_Very_High-Resolution_UAV-Optimized_Deep_Learning_Model_for_Sea_Ice_Classification)

[^34]: [Perspectives and Challenges in High-Resolution Whole-Atmosphere Modeling - ResearchGate](https://www.researchgate.net/publication/398041722_Perspectives_and_Challenges_in_High-Resolution_Whole-Atmosphere_Modeling)

[^35]: [Machine Learning-Based Estimation of foF2 and MUF(3000)F2 Using GNSS Ionospheric TEC Observations - MDPI](https://www.mdpi.com/2072-4292/17/10/1764)

[^36]: [Machine Learning-Based Ionospheric Modelling Performance During High Ionospheric Activity - ResearchGate](https://www.researchgate.net/publication/368494283_Machine_Learning-Based_Ionospheric_Modelling_Performance_During_High_Ionospheric_Activity)

[^37]: [Ionosphere forecast model - Science.gov](https://www.science.gov/topicpages/i/ionosphere+forecast+model.html)

[^38]: [An explainable Machine Learning model for Large-Scale Travelling Ionospheric Disturbances forecasting - Space Weather Journal](https://www.swsc-journal.org/articles/swsc/full_html/2025/01/swsc240048/swsc240048.html)

[^39]: [NAVOCEANO Web Services: Online Data - CHIPS](https://www.doncio.navy.mil/%284l02cj45wfyum345glyihkqb%29/CHIPS/ArticleDetails.aspx?ID=3256)

[^40]: [Design of an Integrated Web Services Brokering System - DTIC](https://apps.dtic.mil/sti/tr/pdf/ADA554951.pdf)

[^41]: [Meteorological and Oceanographic Support From CONUS-Based Support Centers - DoD](https://media.defense.gov/2002/Feb/19/2001712538/-1/-1/1/02-052.pdf)

[^42]: [MAGTF Meteorology and Oceanography Support - Marines.mil](https://www.marines.mil/Portals/1/MCWP%203-35.7.pdf)

[^43]: [Net-centric issues for large scale tactical data - ResearchGate](https://www.researchgate.net/publication/264816163_Net-centric_issues_for_large_scale_tactical_data)

[^44]: [Official Event Guide - Sea Air Space](https://seaairspace.org/wp-content/uploads/2024/03/Official-Event-Guide_digital.pdf)

[^45]: [Naval electronics face rugged application challenges - Military Embedded Systems](https://militaryembedded.com/radar-ew/rugged-computing/naval-electronics-face-rugged-application-challenges)

[^46]: [Weather data publication on the LOD using SOSA/SSN ontology - ResearchGate](https://www.researchgate.net/publication/341091391_Weather_data_publication_on_the_LOD_using_SOSASSN_ontology)

[^47]: [FACE Time: Capability Innovation Model for Cyber Physical Systems - DTIC](https://apps.dtic.mil/sti/trecms/pdf/AD1111655.pdf)

[^48]: [The Federal Plan for Meteorological Services and Supporting Research, FY 2017](https://zerogeoengineering.com/wp-content/uploads/2019/09/FCM-p1-2017-2.pdf)

[^49]: [ESFLG Model and Data Inventory - FEMA](https://gis.fema.gov/Model-and-Data-Inventory/export/ESFLG%20Model%20and%20Data%20Inventory%20091916.xlsx)

[^50]: [MetOntologies - OGC Public Wiki](https://external.ogc.org/twiki_public/bin/view/MetOceanDWG/MetOntologies)

[^51]: [Report of the WCRP km-scale modeling workshop](https://www.wcrp-climate.org/WCRP-publications/2022/WCRP_Report_08-2022_k-scale-report-final.pdf)

[^52]: [Probabilistic Forecasts of High Impact Weather - Navy SBIR](https://navysbir.us/n24_1/N241-054.htm)

[^53]: [Digital Twin Ocean](https://digitaltwinocean.mercator-ocean.eu/)

[^54]: [A Review of the Applications of Digital Twin Technology in Marine Research - ResearchGate](https://www.researchgate.net/publication/391869803_A_Review_of_the_Applications_of_Digital_Twin_Technology_in_Marine_Research)

[^55]: [MAS-DT - Grants on the Web](https://gotw.nerc.ac.uk/list_full.asp?pcode=NE%2FZ503381%2F1)

[^56]: [Assessment of Quantum ML Applicability for Climate Actions - NASA](https://ntrs.nasa.gov/api/citations/20240015057/downloads/IEEE_BigData24_Quantum_Machine_Learning.pdf)
