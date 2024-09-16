Frågor:

# I del 2, translaterade du med translationsmatris eller med addition på koordinater? Spelar det någon roll?

Translerade med translationsmatris, blir lättare att arbeta om man kommer in i matris tänket men annars samma, den extra kolumnen "adderas bara".

# Hur löste du GPU-skinningen? Vilken information behövde skickas till shadern?

Skicka M1, M2 och bonepos sen gör samma som i cpu. Hade egentligen bara behövt skicka M1 M2 eftersom bonepos fanns i 4e koloumen

# Om man gör skinning med en mer komplex modell (armar och ben mm), behövs vilolägesrotationer egentligen?

Behövs inte riktigt Rrest * Ranim är bara en ny rotations matris, men kan bli enkare att arbeta om man har en position att "utgå ifrån"
