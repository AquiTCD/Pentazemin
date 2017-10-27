<template lang="pug">
  nav.navbar
    .navbar-brand
      router-link.root.navbar-item(to="/")
        img(src="static/images/icon.png")
    .navbar-menu
      .navbar-start
        router-link.plan.navbar-item(to="/plan") Plan
        router-link.aim.navbar-item(to="/aim") Aim
        router-link.analyze.navbar-item(to="/analyze") Analyze
      .navbar-end
        .navbar-item
          .field.has-addons
            new-task
            archive
</template>

<script>
import NewTask from '@/components/Global/Modals/NewTask'
import Archive from '@/components/Global/Modals/Archive'
export default {
  name: 'Navbar',
  components: {
    NewTask,
    Archive,
  },
}
</script>

<style lang="stylus" scoped>
  .navbar
    border-bottom: 1px solid #ccc
</style>
