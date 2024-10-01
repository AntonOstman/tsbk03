Fråga:

# Hur gjorde du för att söka igenom alla boids?

while (boid != null){
    ...
    boid = boid->next
}

# Fråga: Vilken funktion valde du för den bortstötande kraften? Är din separation bra eller kan du tänka dig finjusteringar?

1 / distance^2

Den kan nog förbättras, hade gärna velat att boids extremt nära fick en väääldigt hög bortstöt

# Vilken vikt lade du på alignment? Hur mycket rätar de upp sig efter varandra per iteration?

0.074

De rättar upp sig ganska direkt

# Hur håller du reda på ditt "svarta får”?

global variabel

# Är ditt svarta får en "ledare" eller en "busig flockmedlem". Hur skulle du ha gjort för att göra den andra av dessa två?

Ledare men ibland vandrar han iväg för sig själv. När flocken har konvergerat får han alla att följa med starkare

Vet inte riktigt vad skillnaden mellan busig flockmedlem och ledare ska innebära, han kommer väl alltid ha en påverkan på resten?
