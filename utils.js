#       This is just a basic clock applet for the FitBit Versa
#       I'm still learning how this all works, so please be nice
#                 V1.0 developed by Mathew Hutchison
#                             13/06/2019
# 
#       This file goes in the /common/ folder when designing,
#       just a basic function for counting the time

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
