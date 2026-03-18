const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "src",
  "components",
  "pages",
  "healingServices",
  "beautyTherapy",
  "BeautyTherapy.jsx",
);
let content = fs.readFileSync(filePath, "utf8");

// The items we want to extract
const startIndex = content.indexOf(
  '  // Beautiful Hair\n  {\n    category: "beautifulHair"',
);
const endIndex = content.indexOf("  // Graceful Women");

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find blocks");
  process.exit(1);
}

const beautifulHairBlock = content.substring(startIndex, endIndex);

// Replace "beautifulHair" with "beautifulHairFemale"
const femaleBlock = beautifulHairBlock.replace(
  /category: "beautifulHair"/g,
  'category: "beautifulHairFemale"',
);

// Create male block by replacing "beautifulHair" with "beautifulHairMale"
const maleBlock = beautifulHairBlock
  .replace("  // Beautiful Hair", "  // Beautiful Hair Male")
  .replace(/category: "beautifulHair"/g, 'category: "beautifulHairMale"');

// Replace the original block with both blocks
const newContent =
  content.substring(0, startIndex) +
  femaleBlock +
  maleBlock +
  content.substring(endIndex);

// Also revert the filter logic since we now have exact mappings
const oldFilter = `  const filteredServices = beautyData.filter((service) => {
    if (selectedCategory === "All") return true;
    
    // Map individual hair care tabs to the unified "beautifulHair" category in data
    if (
      (selectedCategory === "beautifulHairFemale" || selectedCategory === "beautifulHairMale") &&
      service.category === "beautifulHair"
    ) {
      return true;
    }
    
    return service.category === selectedCategory;
  });`;

const newFilter = `  const filteredServices = beautyData.filter((service) => {
    return selectedCategory === "All" || service.category === selectedCategory;
  });`;

let finalContent = newContent;
if (finalContent.includes(oldFilter)) {
  finalContent = finalContent.replace(oldFilter, newFilter);
} else {
  // If it was reverted manually, just ensure the standard logic is there
  const alternativeFilter = `  const filteredServices = beautyData.filter((service) => {
    if (selectedCategory === "All") return true;
    
    if (
      (selectedCategory === "beautifulHairFemale" || selectedCategory === "beautifulHairMale") &&
      service.category === "beautifulHair"
    ) {
      return true;
    }
    
    return service.category === selectedCategory;
  });`;

  if (finalContent.includes(alternativeFilter)) {
    finalContent = finalContent.replace(alternativeFilter, newFilter);
  }
}

fs.writeFileSync(filePath, finalContent, "utf8");
console.log(
  "Successfully split beautifulHair into Female and Male arrays and updated filtering logic!",
);
