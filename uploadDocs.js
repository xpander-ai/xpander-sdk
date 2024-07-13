require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.README_API_KEY;
const baseUrl = 'https://dash.readme.com/api/v1';

const readmePath = path.join(__dirname, 'README.md');
const apiDocsPaths = {
  python: path.join(__dirname, 'API_python.md'),
  node: path.join(__dirname, 'API_node.md'),
  dotnet: path.join(__dirname, 'API_dotnet.md'),
  java: path.join(__dirname, 'API_java.md')
};

// Helper function to get or create a category
async function getOrCreateCategory(title, parent = null) {
  try {
    const response = await axios.get(`${baseUrl}/categories`, {
      headers: { Authorization: `Basic ${Buffer.from(apiKey + ':').toString('base64')}` }
    });

    const existingCategory = response.data.find(cat => cat.title === title && cat.parentCategory === parent);
    if (existingCategory) {
      console.log(`Found existing category: ${existingCategory.title}`);
      return existingCategory;
    } else {
      const newCategory = await axios.post(
        `${baseUrl}/categories`,
        { title, parentCategory: parent, type: 'guide' },
        { headers: { Authorization: `Basic ${Buffer.from(apiKey + ':').toString('base64')}` } }
      );
      console.log(`Category created: ${newCategory.data.title}`);
      return newCategory.data;
    }
  } catch (error) {
    console.error(`Error fetching or creating category: ${error.response?.data?.error || error.message}`);
    throw error;
  }
}

// Helper function to create a document
async function createDocument(title, category, body, parentDoc = null) {
  try {
    const response = await axios.post(
      `${baseUrl}/docs`,
      { title, category, body, parentDoc, type: 'basic' },
      { headers: { Authorization: `Basic ${Buffer.from(apiKey + ':').toString('base64')}` } }
    );
    console.log(`Document created: ${response.data.title}`);
    return response.data;
  } catch (error) {
    console.error(`Error creating document: ${error.response?.data?.error || error.message}`);
    throw error;
  }
}

// Main function to create your documentation
async function main() {
  // Get or create the main category
  const mainCategory = await getOrCreateCategory('Xpander SDK');

  // Create or get the Introduction document
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');
  await createDocument('Introduction', mainCategory._id, readmeContent);

  // Read content from language-specific API.md files
  const apiDocsContent = {
    python: fs.readFileSync(apiDocsPaths.python, 'utf-8'),
    node: fs.readFileSync(apiDocsPaths.node, 'utf-8'),
    dotnet: fs.readFileSync(apiDocsPaths.dotnet, 'utf-8'),
    java: fs.readFileSync(apiDocsPaths.java, 'utf-8')
  };

  // Create subpages for each language under the "Getting Started" category
  await createDocument('Getting Started', mainCategory._id, readmeContent);
  await createDocument('Python', mainCategory._id, apiDocsContent.python);
  await createDocument('Node.js', mainCategory._id, apiDocsContent.node);
  await createDocument('.NET', mainCategory._id, apiDocsContent.dotnet);
  await createDocument('Java', mainCategory._id, apiDocsContent.java);
}

// Run the main function
main();