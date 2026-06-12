# GRASP:GPU-Refactored Accelerated Search Pipeline

This page presents a collection of pulsar candidates and pulsars identified or followed up by the [Pulsar and Gravitational Physics Group NAOC](http://groups.bao.ac.cn/psr/en/).

## Search Strategy

Our searches are carried out with a fast pulsar-search pipeline that combines FFT-based periodicity searches with FFA-based searches. The goal is to keep the search efficient while maintaining sensitivity to different pulse-period and pulse-shape regimes.

The general search flow is:

1. Prepare search time series and generate trial dispersion-measure (DM) data products in GPU.
2. Run an FFT-based periodicity search to efficiently detect period signals, including accelated pulsars, with our optimized GPU accelsearch.
3. Run an FFA-based search to improve sensitivity to long-period pulsars and broad-duty-cycle pulse profiles that may be less significant in a pure FFT search.
4. Fold promising candidates and inspect the diagnostic plots.
5. Cross-check candidates against observing metadata and known-source information before promoting them for follow-up.

The FFT and FFA searches are complementary. FFT search is computationally efficient and well suited to many short-period periodic signals, while FFA search can recover signals whose pulse shapes or periods make them difficult to rank highly in the FFT domain. Combining both methods gives a broader and more robust candidate list for manual inspection and follow-up.

We use [Multi](https://github.com/ifuqy/Multi) and [PICS](https://github.com/zhuww/ubc_AI) for candidates selection. 

Candidate status may evolve as additional observations, timing solutions, or cross-matching results become available.

The searches are carried out on FAST projects that lead by our group members and released data. 
We gratefully acknowledge the principal investigators and observing teams who make their data available for further scientific use.

## Web Page
The web page records each pulsar candidates with name, position, DM, spin period, discovery date, project name, and folded diagnostic image.

Detailed information is bellow:
(https://0s11song.github.io/GRASP-Pulsar-Candidates)
