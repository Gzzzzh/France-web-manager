<template>
  <members-detail :is-edit="true" />
</template>

<script>
import MembersDetail from './components/MembersDetail'

export default {
  name: 'EditForm',
  components: { MembersDetail }
}
</script>

