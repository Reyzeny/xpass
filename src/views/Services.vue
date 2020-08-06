<template>
    <section>
      <navbarwithside/>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <serviceAirtimeData v-if="serviceOption==='airtime_data'" :service_id="serviceId" :specific="specific"/>
            <serviceBills v-else-if="serviceOption==='bills'" :service_id="serviceId"/>
            <serviceBank v-else-if="serviceOption==='bank'"/>
        </div>
        <div class="col-md-2"></div>
      </div>
    </section>
</template>

<script>

import serviceAirtimeData from '@/components/Service_AirtimeData.vue';
import serviceBills from '@/components/Service_Bills.vue';
import serviceBank from '@/components/Service_Bank.vue';

export default {
  components: {
    serviceAirtimeData,
    serviceBills,
    serviceBank,
  },
  data() {
    return {
      serviceOption: '',
      serviceId: 0,
      specific: '',
    };
  },
  created() {
    this.serviceId = this.$route.params.categoryId;
    this.serviceOption = this.$route.params.serviceOption;
    if (this.$route.params.specific) {
      this.specific = this.$route.params.specific;
    }
    console.log('from services, ', this.serviceId, this.serviceOption);
  },
};
</script>
