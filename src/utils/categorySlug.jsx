export function categoryToSlug(category) {
  return category
    .toLowerCase()
    .trim()
    // Replace ' + ' (space-plus-space) with hyphen
    .replace(/\s*\+\s*/g, '-')  
    // Replace any spaces with hyphen
    .replace(/\s+/g, '-')       
    // Remove all non-alphanumeric and non-hyphen chars (optional, for cleaner URLs)
    .replace(/[^a-z0-9-]/g, '') 
    // Replace multiple hyphens with one
    .replace(/-+/g, '-')        
    // Remove leading or trailing hyphens
    .replace(/^-+|-+$/g, '');   
}

export function slugToCategory(slug) {
  const slugMap = {
    'serums': 'Serums',
    'oils': 'Oils',
    'cleansers': 'Cleansers',
    'eye-creams': 'Eye Creams',
    'moisturizers': 'Moisturizers',
    'lip-care': 'Lip Care',
    'scrubs': 'Scrubs',
    'body-moisturizers': 'Body Moisturizers',
    'soaps': 'Soaps',
    'bath-body': 'Bath + Body',
    'fine-lines': 'Fine Lines',
    'dullness': 'Dullness',
    'dryness': 'Dryness',
    'acne': 'Acne',
    'redness': 'Redness',
    'new': 'New',
    'sets': 'Sets',
    'all': 'All',
  };

  if (slugMap[slug]) {
    return slugMap[slug];
  }

  // Fallback: capitalize words separated by hyphens, join with space
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
