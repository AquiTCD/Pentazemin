<template lang="pug">
  .container
    .columns
      .column
        .title How to use
    .columns
      .column
        .title Step 1
        img(src="~/assets/images/step1.png")
        .subtitle Create Missions
        p In Pentazemin, Task is named 'Mission',
        | Pomodoro mean a durration of minimum term.
        | A Mission has a pomodoro or more,
        | just think like 'How many pomodoros does this mission need?'
        | Then, set your all tasks that you want to do this day.
      .column
        .title Step 2
        img(src="~/assets/images/step2.png")
        .subtitle Change Aiming mode
        p In Aiming mode, you can see
        ul
          li What are the current mission and the next.
          li When I finish all my tasks (which meas when can I leave my office)\
          li How many Pomodoros remaining, and you have done.
      .column
        .title Step 3
        img(src="~/assets/images/step3.png")
        .subtitle Shoot your tasks.
        p The timer runs automatically.
        | You just do tasks is inidicated or take a break.
        | You can finish all your task at the tiem you were imagined,
        | unless you stop the timer by yourself.
      .column
        .title Step 4
        img(src="~/assets/images/step4.png")
        .subtitle Archive and Analyze
        p The beggeing of next day,
        | If you archive, the complete task move from list to analyze mode.
        | You can check how was the previous day.
        | Then, back to step 1 to start your new day.
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>

</style>
