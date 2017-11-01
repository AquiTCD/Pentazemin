<template lang="pug">
  footer.footer
    .container
      .content
        .columns
          .column.has-text-centered
            script(async defer src="https://buttons.github.io/buttons.js")
            a.github-button(href="https://github.com/AquiTCD/pentazemin" data-size="large" data-show-count="true" aria-label="Star AquiTCD/pentazemin on GitHub") Star
          .column.has-text-centered
            a(href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false") Tweet
            script(async src="https://platform.twitter.com/widgets.js" charset="utf-8")
          .column.has-text-centered
            #fb-root
            script.
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=369133580200750';
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            .fb-share-button(data-href="https://aquitcd.github.io/Pentazemin/" data-layout="button_count" data-size="large" data-mobile-iframe="true")
              a.fb-xfbml-parse-ignore(target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Faquitcd.github.io%2FPentazemin%2F&amp;src=sdkpreparse") Share
          .column.has-text-centered
            a(href="http://b.hatena.ne.jp/entry/s/aquitcd.github.io/Pentazemin/" class="hatena-bookmark-button" data-hatena-bookmark-layout="basic-label-counter" data-hatena-bookmark-lang="en" title="このエントリーをはてなブックマークに追加")
            img(src="https://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;")
            script(src="https://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async")
      .content.has-text-centered
        p Code licensed under MIT License.
          br
          | © 2017 Pentazemin
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>

</style>
