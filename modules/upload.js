var cheerio = require("cheerio"); /* Used to extract html content, based on jQuery || install with npm install cheerio */
var request = require("request"); /* Used to make requests to URLs and fetch response  || install with npm install request */
const fs = require('fs');
var discord = require("discord.js");

module.exports.run = async (message, count) => {

    /* extract search query from message */
    parts = message.content.split(" ");
    var search = parts.slice(1).join(' '); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"

    var options = {
        url: "https://results.dogpile.com/serp?q="+search+"&page="+count+"&sc=SfNTDvSnoZEhyFTDNw5NMsVxUIWRF5hNKY86pa8ux2VgcTkInCUKBPiFDD1XP6muBddH643Q4B32ivIJIE3frSnCldY-ti4ixXMnR3hx4YIVZQBLlrZ-S-_u7-lyR80oRC4OZlhsC95gyFiR8khjN5mkcoohaidv2CCxN-N6HIB-KPKng9w-gYFVpBUMEYS9TNuXsE1hQ9n481VrRx7PEHBLpxxpP0H8hHldi9jktk_q2nbW6I6elP5jY3XJoWD-x_Jut3mFhTH2rB7Eu6yQWfLRfpn8QmgjpVPMyCoGPxnDbuyeopdKfDq6lmnNOpGz9PXK_fYgaR55SlHKT7BkhbfJr9FGiXIWsI7TPrHLaK4G9KW4AwhCllM_1bVu4ZyBlAIjEecwLFNPl8j2QsOUAtmIYgIsH9kmSBEZnk93TRgtT0I4-8OF3BTeAFWTYkJ2bwdWON4gqD44yDPUCFC0qEOiWCooSchCeRZAe-Xb80hGmgeDqjz611dtMfjIhVPB6w5hGo_c_NIjDufvWvJz0DNJVAgordqqYHXF-_LUYxpMbnltBInuh0WgO9OJYxyc3KQau11r2zqEy6xkKRFEhkSezf-W-JE6bcIvLwF32k0uMazqoKBckCsS77QMw18PKUbrTjHyOQPE3JF1jnSx58WhLmAQDXftIxiA7KZhuwccYldTRvKQB9e8MrR4YdfmY_j9nfjY22heh1bw45ZXJP91BE8eNr2Jl1UvfJaCzi5bz6nuXI0FpWjyb5dvvSifh5GfHALr4eaam32R-aSoo8A9qrq6-Uqu1JYmt3btmD8gvBCKUWQ_iCJjF5O-n5i9eMnOZxEk138QWvpR7gdXEMNqYSZMAJ8eTdgnUWE5a8Kz2wXFXmt_s6_iwspJbXvll0Y9TKx_3mpFN2_j5U7rnMz2bQ4_9ES1L8r9VHKDXSJdDi8HRsYH8u8RyQqYMaCmo-FefUOrR2fw601M86UrngakAnIpyP9RsyMNlmKEPHRR56hTIhb6rxo2NyJ4PDxlVUsda0Yhh0850Ci6S7P0X1ZeyW0OglZKTfHcoDFqBq70MivCmI3jf1f_x4iWCDScLPUJHbRoY0TEhvQFPUfVCMh-ly0upl5rUaRd7aNjR2ZMRKtNnrgz_JXgLbXTvwXHd6iQfyYsbDIz56Z7XWEIyV9JSzkX19ZeF2EmD-kVZTnAClzsvqTEi2WaX2w-BG6a1lDhpwstQBdDeJUaPek3Qa2iubqxQG4NMXDM1LYUcSgJVWTi1oUHtdn5hIMNSNcYyOU4GOiFW7M62AlSBlQQylac62FJWOHH2uEDRzf79Oq7AlnZOI4KFxPOV0m5Mm02uIRgigWjaXu9znkI7NuOukXCRUQkThc1EroJWSMLAw53JlXtDPDSS_BB4A6WdsxfN2f_rO6K1iBnK5uG_fn-d-AHxF-AT5Dt9YwwCQseKZNVZfTBLm4DjIfw3colM19SeAsorcDKgIpM93IBYuZuI9ZorKq0K_lel1zxu0mbhoVpWJ__RgbMGDhGAycQRaL3azXCYKrDT_pIuY5Vf65maUPUV3S6KN2WefN_-53bRkluHXjkniVLGqKd74F-eCkKci7d6gDf2EzYO0Y4a5lfeJdNRGPkQCBhZOtMwsettT0dyeaROxkwFgjok1GQzgW_g9RUyOD6fz4lJKjTawN85dfNw0a_ZrAApMfjN7p1gwGC97oPNcIkZK30PWqlR7FON6HgYPAONC91Sub4IEI6xIjHOxBcGnWWZP30Umz9LDpgh8luAHaB2m94d6VnURrcCJDOKn7hpuwDDHBYvFJ-III-a7RAEm4fxhXWUpS1HoFdHb7nJYZqvFTUoPS8uGc2Szdj8sZrJJ4",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            // handle error
            console.log(error)
            return;
        }

        console.log("I got it!");
        /* Extract image URLs from responseBody using cheerio */

        $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)

        // In this search engine they use ".image a.link" as their css selector for image links
        var links = $(".image a.link");

        // We want to fetch the URLs not the DOM nodes, we do this with jQuery's .attr() function
        // this line might be hard to understand but it goes thru all the links (DOM) and stores each url in an array called urls
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);
        if (!urls.length) {
            // Handle no results
            return;
        }

        // Send result
        console.log(urls);
        fs.appendFile("./URL/"+search.replace(' ','_')+"_examples.json", JSON.stringify(urls), function (err) {
  if (err) throw err;
  console.log('Saved!');

  var stringUrl = "./URL/"+search.replace(' ','_')+"_examples.json";
  stringUrl =stringUrl.toString();


});
    });
      //return "./URL/"+search.replace(' ','_')+"_examples.json";
}
