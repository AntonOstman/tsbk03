// Variant with SimpleGUI

#include <cstddef>
#include <stdlib.h>
#include "MicroGlut.h"
#include "LoadTGA.h"
#include "SpriteLight.h"
#include "GL_utilities.h"
#define MAIN
#include "VectorUtils4.h"
#include "SimpleGUI.h"

// Add more globals as needed

// Example of user controllable parameter
float someValue = 1.0;
float cohesionWeight = 0.12;
float seperationWeight = 0.130;
float alignmentWeight = 0.074;
float randomness = 0.84;
SpritePtr blackie;
SpritePtr scary;
vec3 dog_location = {100.0, 100.0, 0.0};

void SpriteBehavior() // Your code!
{

    SpritePtr sprite = gSpriteRoot;

    while (sprite != NULL)
    {
        float num_sprites = 0.0;
        vec3 mass_location = vec3(0.0,0.0,0.0);
        vec3 seperation = vec3(0,0,0);
        vec3 alignment = vec3(0,0,0);
        vec3 direction = vec3(0,0,0);

        if (sprite == scary) {
            sprite = sprite->next;
            continue;
        }

        float flocking_dist = 100.0;

        SpritePtr spritei = gSpriteRoot;

        while(spritei != NULL)
        {
            if (spritei == sprite || spritei == scary) {
                spritei = spritei->next;
                continue;
            }
            if (Norm(sprite->position - spritei->position) < flocking_dist){
                mass_location += spritei->position;
                num_sprites += 1.0;
            }
            spritei = spritei->next;
        }

        mass_location = mass_location / num_sprites;
        direction = mass_location - sprite->position;

        // Your code
        // Example affecting sprites by a controllable parameter

        SpritePtr spritej = gSpriteRoot;
        while(spritej != NULL) {

            if (spritej == sprite || spritej == scary) {
                spritej = spritej->next;
                continue;
            }
            if (Norm(sprite->position - spritej->position) < flocking_dist){
                float weight = pow((Norm(sprite->position - spritej->position) + 0.001), 2);
                seperation += (sprite->position - spritej->position) * 1.0/weight;
                alignment += (spritej->speed);
            }
            spritej = spritej->next;
        }



        if (Norm(seperation) > 0.0001) {
            sprite->speed += normalize(seperation) * seperationWeight;
        }
        if (Norm(alignment) > 0.0001) {
            sprite->speed += normalize(alignment) * alignmentWeight;
        }
        // cohesion
        if (Norm(direction) > 0.0001 && num_sprites > 0) {
            sprite->speed += normalize(direction) * cohesionWeight;
        }

        if (Norm(scary->position - sprite->position) < 100) {
            float weight = 100.0/Norm(scary->position - sprite->position);
            sprite->speed += -normalize(scary->position - sprite->position) * weight;
        }
        sprite->speed.z = 0.0;
        sprite->speed = normalize(sprite->speed);
        
        sprite = sprite->next;
    }
}

// Drawing routine
void Display()
{
    SpritePtr sp = gSpriteRoot;
    
    glClearColor(0, 0, 0.2, 1);
    glClear(GL_COLOR_BUFFER_BIT+GL_DEPTH_BUFFER_BIT);
    glEnable(GL_TEXTURE_2D);
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    
    DrawBackground();
    SpriteBehavior(); // Your code
    blackie -> speed.x = (random() - pow(2,31)/2 ) / (pow(2,31) - 1) * randomness + blackie->speed.x;
    blackie -> speed.y = (random() - pow(2,31)/2 ) / (pow(2,31) - 1) * randomness + blackie->speed.y;
    scary ->position = dog_location;
    do
    {
        HandleSprite(sp); // Default movement my speed. Callback in a real engine
        DrawSprite(sp);
        sp = sp->next;
    } while (sp != NULL);

        sgDraw();

    glutSwapBuffers();
}

void Reshape(int h, int v)
{
    glViewport(0, 0, h, v);
    gWidth = h;
    gHeight = v;
}

void Key(unsigned char key,
         __attribute__((unused)) int x,
         __attribute__((unused)) int y)
{
  switch (key)
  {
    case '+':
        someValue += 0.1;
        printf("someValue = %f\n", someValue);
        break;
    case '-':
        if (someValue > 0.5) someValue -= 0.1;
        printf("someValue = %f\n", someValue);
        break;
    case 0x1b:
      exit(0);
  }
}

void Init()
{
    TextureData *sheepFace, *blackieFace, *dogFace, *foodFace;

    LoadTGATextureSimple("bilder/leaves.tga", &backgroundTexID); // Background

    sheepFace = GetFace("bilder/sheep.tga"); // A sheep
    blackieFace = GetFace("bilder/blackie.tga"); // A black sheep
    dogFace = GetFace("bilder/dog.tga"); // A dog
    foodFace = GetFace("bilder/mat.tga"); // Food

    scary = NewSprite(dogFace, 300, 200, 1, 1);
    for (int i = 0; i < 100; i ++){
        NewSprite(sheepFace, i*2, 200, 1, 1);
    }
    NewSprite(sheepFace, 200, 100, 1.5, -1);
    NewSprite(sheepFace, 250, 200, -1, 1.5);
    NewSprite(sheepFace, 200, 200, -1, 1.5);
    blackie = NewSprite(blackieFace, 200, 200, -1, 1.5);

    sgCreateSlider(-1, -1, 200, &cohesionWeight, 0.01, 0.2);
    sgCreateDisplayFloat(-1, -1, "Cohesion: ", &cohesionWeight);
    sgCreateSlider(-1, -1, 200, &seperationWeight, 0.01, 0.2);
    sgCreateDisplayFloat(-1, -1, "Seperation: ", &seperationWeight);
    sgCreateSlider(-1, -1, 200, &alignmentWeight, 0.01, 0.2);
    sgCreateDisplayFloat(-1, -1, "Alignment: ", &alignmentWeight);
    sgCreateSlider(-1, -1, 200, &randomness, 0.01, 10);
    sgCreateDisplayFloat(-1, -1, "Randomness: ", &randomness);
    
    // Always fix the colors if it looks bad.
    sgSetFrameColor(0,0,0);
    sgSetBackgroundColor(1, 1, 1, 0.5);
    sgSetTextColor(0, 0, 0);    
}

void mouse(int button, int state, int x, int y)
{
    sgMouse(state, x, y);
    dog_location.x = x;
    dog_location.y = 1024 - y;
    printf("%f %f \n", dog_location.x, dog_location.y);
    
    glutPostRedisplay();
}

void drag(int x, int y)
{
    sgMouseDrag(x, y);
    glutPostRedisplay();
}

int main(int argc, char **argv)
{
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_RGBA | GLUT_DOUBLE);
    glutInitWindowSize(800, 600);
    glutInitContextVersion(3, 2);
    glutCreateWindow("Lab 4 Flocking");
    
    glutDisplayFunc(Display);
    glutRepeatingTimer(20); // Should match the screen synch
    glutReshapeFunc(Reshape);
    glutKeyboardFunc(Key);
    glutMouseFunc(mouse);
    glutMotionFunc(drag);
    
    InitSpriteLight();
    Init();
    
    glutMainLoop();
    return 0;
}
