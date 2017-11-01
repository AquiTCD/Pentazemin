<template lang="pug">
  .container
    .columns
      .column
        .title The concepts
    .columns
      .column
        .subtitle Problems of ordinary ToDo app
        ol
          li Hard to estimate, because size of each tasks is not constant
          li Easy to postpone tasks you do not want to do
          li Not clear the progress and the time to finish
      .column
        .subtitle Problems of ordinary Pomodoro timer app
        ol
          li Need to control something every time of Pomodoro finished
          li Not strong enough to keep concentration
          li Not fanctional ennough for potential of Pomodoro Technique
    .columns
      .column
        .subtitle 1. A shortest term is fixed 25 minuts
        p
          | Easy to estimate each tasks. Even if A task is big, just think like 'How many Pomodoros need to do this task?'.
          br
          | Easy to recognize unclear tasks. If the count of Pomodoros are too many for one task, which means the tasks should be crushed smaller some tasks.
      .column
        .subtitle 2. Starts next task automaticaly without any control
        p
          | If the app need any touching to control when move to next task, it make you easy to lose your concentration and pace. That is the reason why starts timer automatically not to disturb.
      .column
        .subtitle 3. Indicates progress and the time to finish
        p
          | To know the time to finish all tasks, it gives you motivation. And also it is useful when you set tasks to make a balance of quantity.
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>

</style>
