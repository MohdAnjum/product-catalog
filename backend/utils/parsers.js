// 📦 utils/parsers.js

// Safely parses comma-separated strings into an array
const parseArray = (value) => {
  if (typeof value !== 'string') return [];
  return value.split(',').map(item => item.trim()).filter(Boolean);
};

// Parses a number safely, with optional default fallback
const parseNumber = (value, defaultVal = 0) => {
  const num = Number(value);
  return isNaN(num) ? defaultVal : num;
};

// Safely parses a JSON string to object, returns null on error
const safeJSONParse = (json) => {
  try {
    const parsed = JSON.parse(json);
    return typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch (e) {
    return null;
  }
};

module.exports = {
  parseArray,
  parseNumber,
  safeJSONParse
};
