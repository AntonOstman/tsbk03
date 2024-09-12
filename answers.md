
Frågor (skissa svar innan redovisning):

# Hur ser högdagrarna ut i 1a? Varför?

Den är ljus pga den spekulära komponenten i phong shading

# Hur allokerar man en tom textur?

glTexImage2D(GL_TEXTURE_2D,0, GL_RGBA32F,texSize,texSize, 0,GL_RGBA, GL_FLOAT, data)
och data=NULL

# Hur många pass körde du lågpassfiltret i 1c och 1d?

30 st, onödigt många?


# Hur löste du 1f (om du gjorde det)? Vilket/vilka filter? (Extrauppgift)

# Bör trunkeringen göras i egen shader eller som del av en shader som gör något mer? Varför?

Beror väl på målet, om vi inte behöver värden över 1 kan vi göra i en shader.
Men man kan tänka sig ha en separat bara för trunkering som man gör när man inte längre vill spara informationen.


lab 1-2

Frågor:

# Vilken bumpmappning tycker du är att föredra, vykoordinater eller texturkoordinater? Varför? Vad är skillnaden mellan att arbeta i vy- och texturkoordinater? Vilken bumpmappning (2a eller 2b) är lämplig för normalmapping?

Tangentspace är lämplig för normalmapping eftersom alla gradienter är samma oberoende av form på objektet.
Största skillnaden är att man atningen transformerar ljus till tagnentspace eller bumps till viewspace

# Definierar du bumpmappen som avstånd in i eller ut ur objektet? Var spelar det in?

avstånd in, när de pekar in får man mindre visuella artifakter

# Blev Mvt rätt med mat3 i 2b? Om inte, vad gjorde du åt det?

mat3 stores them vertically so we need to transpose after creating
