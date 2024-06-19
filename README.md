# Information Concealer
<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/5541/5541422.png" alt="Img_here">
</div>

## Overview

Welcome to the **Information Concealer**! This application allows you to hide secret messages within images using the Least Significant Bit (LSB) substitution algorithm. By altering only the least significant bit of each pixel, the tool ensures that the changes are visually imperceptible, thus maintaining the image quality.

## Features

- **Encode Messages:** Hide a secret message within an image.
- **Decode Messages:** Extract the hidden message from a steganographic image.
- **Image Quality Preservation:** Only the LSB of the pixels is altered to maintain the image's quality.
- **User-friendly Interface:** Simple and intuitive design using HTML, CSS, and JavaScript.

## How It Works

1. **Encoding:**
   - The secret message is converted to its binary representation.
   - Each bit of the message is embedded into the LSB of the image's pixel values.

2. **Decoding:**
   - The LSBs of the image's pixel values are extracted.
   - The binary data is then converted back to the original message.

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/Ayushvishwakarma04/steganography.git
cd steganography
