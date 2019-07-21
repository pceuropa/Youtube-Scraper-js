const request = require('request');
const cheerio = require('cheerio');
const URL = require('url-parse');

/**
 * This is the model class for table "video".
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property int $category
 * @property int $regions_allowed
 * @property string $created
 * @property string $updated
 * @property string $image
 * @property string $yt_id
 * @property int $width
 * @property int $height
 * @property string $content_region
 * @property int $is_family_frendly
 * @property int $interaction_count
 * @property string $date_published
 * @property string $channel
 *
 * Autor: Rafal Marguzewicz
 * Do you need my help. Feel free to call me: +48 514 777 757
 */

function searchForWord($, word) {
  const bodyText = $('html > body').text();
  if(bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
    return true;
  }
  return false;
}
console.time("Time:");

var pageToVisit = "https://www.youtube.com/watch?v=oaFkDvSa4fo";

request(pageToVisit, function(error, response, html) {
   if(error) {
     console.log("Error: " + error);
   }
   console.info("Visit page %o, Status code: %o", pageToVisit, response.statusCode);
   if(response.statusCode === 200) {
     const $ = cheerio.load(html);
     let tags = []
     let a = []

     $("meta[property='og:video:tag']").each(function (i, e) {
        tags.push($(this).attr("content"));
      });

     $("a").each(function (i, e) {
       let link = $(this).attr("href")

       if (link.includes('watch?v=')) {
          a.push(link.substr(link.length - 11))
       }
      });

     const data = {
       title: $('title').text(),
       description: $('#eow-description').text(),
       tags: tags,
       //category
       category: $("meta[itemprop='genre']").attr("content"),
       regions_allowed: $("meta[itemprop='regionsAllowed']").attr("content"),
       is_family_frendly: $("meta[itemprop='isFamilyFriendly']").attr("content"),
       image: $("link[itemprop='thumbnailUrl']").attr("href"),
       yt_id: $("meta[itemprop='videoId']").attr("content") || 'oaFkDvSa4fo',
       width: $("meta[itemprop='width']").attr("content"),
       height: $("meta[itemprop='height']").attr("content"),
       a: a,
       interaction_count: $("meta[itemprop='interactionCount']").attr("content"),
       date_published: $("meta[itemprop='datePublished']").attr("content"),
       channel: $("meta[itemprop='channelId']").attr("content"),
     }
     console.log('%O', data);
     console.timeEnd("Time:");
   }
});
