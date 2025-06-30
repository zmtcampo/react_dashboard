// New file: data-loader.js
export const loadCSVData = async (filepath) => {
  try {
    const response = await fetch(filepath);
    if (!response.ok) throw new Error("CSV fetch failed");
    const csvText = await response.text();
    return d3.csvParse(csvText);
  } catch (error) {
    console.error("Error loading CSV:", error);
    throw error;
  }
};

// Add new function to handle multiple files
export const loadMultipleCSV = async (fileList) => {
  try {
    // Create a map of file names to promises
    const dataPromises = fileList.map((file) => {
      const filePath = file.startsWith("/") ? file : `/data/${file}.csv`;
      return loadCSVData(filePath)
        .then((data) => ({ [file]: data }))
        .catch((error) => {
          console.warn(`Failed to load ${file}:`, error);
          return { [file]: null };
        });
    });

    // Wait for all promises to resolve
    const results = await Promise.allSettled(dataPromises);

    // Combine all results into a single object
    return results.reduce((acc, result) => {
      if (result.status === "fulfilled") {
        return { ...acc, ...result.value };
      }
      return acc;
    }, {});
  } catch (error) {
    console.error("Error loading multiple CSV files:", error);
    throw error;
  }
};

// Cache mechanism to prevent redundant fetches
const dataCache = new Map();

export const loadCSVWithCache = async (filepath) => {
  if (dataCache.has(filepath)) {
    return dataCache.get(filepath);
  }

  const data = await loadCSVData(filepath);
  dataCache.set(filepath, data);
  return data;
};

// Function to clear cache if needed
export const clearCache = () => {
  dataCache.clear();
};
