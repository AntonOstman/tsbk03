import numpy as np
import scipy.stats as st

def gkern(kernlen=21, nsig=3):
    """Returns a 2D Gaussian kernel."""

    x = np.linspace(-nsig, nsig, kernlen+1)
    kern1d = np.diff(st.norm.cdf(x))
    # kern2d = np.outer(kern1d, kern1d)
    return kern1d / np.sum(kern1d)

print(gkern(5, 1))
print(np.sum(gkern(5, 1)))
