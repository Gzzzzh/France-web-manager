<template>
  <members-detail :is-edit="false" />
</template>

<script>
import MembersDetail from './components/MembersDetail'

export default {
  name: 'EditForm',
  components: { MembersDetail }
}
</script>

