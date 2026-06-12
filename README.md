# GRASP:GPU-Refactored Accelerated Search Pipeline

This page presents a collection of pulsar candidates and pulsars identified or followed up by the NAOC pulsar-search group.

The project is designed as a lightweight public candidate page: each source is shown on an RA/DEC sky grid, with basic parameters such as pulsar name, dispersion measure (DM), spin period, sky position, observing project, and the corresponding folded diagnostic plot.

## Search Strategy

Our searches are carried out with a fast pulsar-search pipeline that combines FFT-based periodicity searches with FFA-based searches. The goal is to keep the search efficient while maintaining sensitivity to different pulse-period and pulse-shape regimes.

The general search flow is:

1. Select open-permission radio observation data suitable for pulsar searching.
2. Prepare search time series and generate trial dispersion-measure (DM) data products.
3. Run an FFT-based periodicity search to efficiently detect narrow-pulse and short-period signals, including millisecond pulsar candidates.
4. Run an FFA-based search to improve sensitivity to long-period pulsars and broad-duty-cycle pulse profiles that may be less significant in a pure FFT search.
5. Fold promising candidates and inspect the diagnostic products, including pulse profile, DM response, sub-band consistency, and sky-position information.
6. Cross-check candidates against observing metadata and known-source information before promoting them for follow-up.

The FFT and FFA searches are complementary. FFT search is computationally efficient and well suited to many short-period periodic signals, while FFA search can recover signals whose pulse shapes or periods make them difficult to rank highly in the FFT domain. Combining both methods gives a broader and more robust candidate list for manual inspection and follow-up.

Candidate status may evolve as additional observations, timing solutions, or cross-matching results become available.

## Data

The searches are carried out on open-permission radio observation data. We gratefully acknowledge the principal investigators and observing teams who make their data available for further scientific use.
The web page records each source with name, position, DM, spin period, discovery date, project name, and folded diagnostic image.

The discovery date can be edited in `data/pulsars.js` with the `discovery_date` field.

Detailed information is bellow:
https://0s11song.github.io/pulsar-candidates
