const { DateTime } = require("luxon");
const { format } = require("date-fns");
const markdownIt = require('markdown-it');
const markdownItDecorate = require('markdown-it-decorate');


module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/assets/");
	eleventyConfig.addPassthroughCopy("src/css/");
	eleventyConfig.addPassthroughCopy("src/js/");
	
	eleventyConfig.addWatchTarget("src/css/");
	
	// --- Here's the updated Markdown section ---
	// 2. We set up our custom markdown library instance here.
	const md = markdownIt({
		html: true, // Allow HTML tags in your Markdown
		breaks: true, // Convert '\n' in paragraphs into <br>
		linkify: true // Autoconvert URL-like text to links
	}).use(markdownItDecorate);

	eleventyConfig.setLibrary("md", md);
	
	//Filters
	eleventyConfig.addFilter("myDateFormat", (dateObj) => {
		// This console.log is great for debugging!
		console.log("Date object type:", typeof dateObj, dateObj); 
		const { format } = require("date-fns");
		return format(dateObj, "MMM dd, yyyy");
	});
  
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});
  
	// /* Creating the posts collection */
    eleventyConfig.addCollection("posts", function (collection) {
		const coll = collection
			.getFilteredByTag("posts")
			.sort((a, b) => b.data.date - a.data.date);
		
		for (let i = 0; i < coll.length; i++) {
			const prevPost = coll[i - 1];
			const nextPost = coll[i + 1];

			coll[i].data["prevPost"] = prevPost;
			coll[i].data["nextPost"] = nextPost;
		}

		return coll;
	});
	
	// return statement
	return {
		dir: {
			input: 'src',
			includes: '_includes',
			output: '_site',
		},
		templateFormats: ['md', 'njk', 'html'],
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
	};
};