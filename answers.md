
Frågor (skissa svar innan redovisning):

Hur ser högdagrarna ut i 1a? Varför?

Den är ljus pga den spekulära komponenten i phong shading

Hur allokerar man en tom textur?

glTexImage2D(GL_TEXTURE_2D,0, GL_RGBA32F,texSize,texSize, 0,GL_RGBA, GL_FLOAT, data)
och data=NULL

Hur många pass körde du lågpassfiltret i 1c och 1d?

????

Hur löste du 1f (om du gjorde det)? Vilket/vilka filter? (Extrauppgift)

Bör trunkeringen göras i egen shader eller som del av en shader som gör något mer? Varför?

Beror väl på målet, om vi inte behöver värden över 1 kan vi göra i en shader.
Men man kan tänka sig ha en separat bara för trunkering som man gör i slutet för att spara informationen.


