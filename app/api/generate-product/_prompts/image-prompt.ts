type imagePromptProps = {
  ingredients?: string;
  productName: string;
};

export const imagePrompt = ({
  ingredients = "ingredients",
  productName = "productName",
}: imagePromptProps) => {
  return `
    Create a vibrant product showcase image featuring a uploaded image in the center,
    surrounded by dynamic splashes of liquid or relevant material that complement the product.
    Use a clean, cold ful background to make the product stand out. Include subtle elements related to the product's flavor.
    ingredients, or theme floating around to add context and visual interest Ensure the product is sharp and in focus,
    with motion and energy conveyed through the splash effects, 
    Also give me image to video prompt for same in JSON format: {textTolmage: '', imageToVideo: ''}
    `;
};
