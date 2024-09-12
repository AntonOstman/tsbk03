
# Chapter 3

## Stencil buffer

Masks things
glStencilFunc
glStencilOp

# fbo

glGenFramebuffer(1, &fb) // Create frame buffer
glBindFramebuffer(gl_framebuffer, &fb) // Bind new framebuffer
glBindFramebuffer(gl_framebuffer, 0) // Render to normal frame buffer
glCheckFramebufferStatus // Check fbo debug info
glClear(GL_DEPTH_BUFFER_BIT) // Clear previous frame values
glColorMask Set color and transparency to render, all false does not render to image

# Shadow begrepp

Occuluder

Revicever

Attached shadow

self-shadow

Projecktion på plana ytor

shadow maps
* problem brusiga kanter
* Shadow bias, skuggmappens yta räknas som längre bort, fixar brusiga kanter men krymper skuggagn
* störst problem i brant  lutning, så använd olika bias beroende på lutning
* Front face culling med skuggorna kan flytta problemet till baksidan

shadow volumes

* projecera en volym av skugga
* om en stråle slutar i en skuggvolym är det skugga annars inte

Mjuka skuggor

PCF - viktigast


# Fråga
Du sa likhet, likhet på vadå?

