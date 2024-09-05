
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

