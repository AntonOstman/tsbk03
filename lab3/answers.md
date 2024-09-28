
# Vad blir den förenklade formeln?

Because normal is scaled vector of Rb and Ra we get
Ra x n = (0,0,0)
Rb x n = (0,0,0)

simplified formula is then

j = -(e + 1)*v-rel / (1/ma + 1/mb)

# Vad behöver du göra för att inte bollarna skall fastna i varandra?

Translera bollarna med djupet på penetrationen längs med kollisions normalen

Update: Bara kolla kollision ifall en boll är snabbare och åker mot en annan andra

# Vilket av testfallen var svårast att uppfylla, och varför?

Elasticitet 0 och 0.5 för att bollarna kunde kollidera flera samtidigt och fastna i varandrna


# Vad blir tröghetsmatrisen för denna modell?

i = 2/5 * m*r*r
I = [i 0 0
     0 i 0
     0 0 i]

# Hur kan denna tröghetsmatris på enklast möjliga sätt användas för att beräkna rotationshastigheten omega från rörelsemängdsmomentet L?

ball[i].omega = InvertMat3(I) * ball[i].L;

# För att nu beräkna en kraft måste vi beräkna hastighetsskillnaden i bollens kontaktpunkt med underlaget. Hur finner vi denna hastighetsskillnad?

Kryssa rotations hastighet vektorn med ytvektorn från golv till mass centrum för att få rotationens bidrag till hastighetsvektorn.
Bollens hastighet kan enkelt adderas.

(ball[i].v + CrossProduct(ball[i].omega, surface))

