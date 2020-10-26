<script>
  import TheFooter from '../components/TheFooter/TheFooter.svelte';

  export let templateHtml, data, request;
  const { lang } = request;
  const { pageLayout } = data;
</script>

<div class="container">
  {@html templateHtml}
</div>

<TheFooter {...pageLayout[lang].theFooter} {lang} />
