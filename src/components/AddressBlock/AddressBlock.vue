<template>
    <div class="form-block">
        <h2 class="title">Место жительства</h2>
        <div class="input-block">
            <label for="index" class="label">Индекс</label>
            <input :value="index" @input="$emit('input', { field: 'index', value: $event.target.value })" id="index"
                class="input-field" type="number" />
        </div>
        <div class="input-block">
            <label for="country" class="label">Страна</label>
            <input :value="country" @input="$emit('input', { field: 'country', value: $event.target.value })"
                id="country" class="input-field" />
        </div>
        <div class="input-block">
            <label for="region" class="label">Область</label>
            <input :value="region" @input="$emit('input', { field: 'region', value: $event.target.value })" id="region"
                class="input-field" />
        </div>
        <div class="input-block">
            <div class="input-head">
                <label for="city" class="label">Город*</label>
                <div class="error" v-if="validation.city.$error">Обязательное поле</div>
            </div>
            <input :value="city" @input="$emit('input', { field: 'city', value: $event.target.value })" id="city"
                class="input-field" :class="{ 'input-error': validation.city.$error }" required />
        </div>
        <div class="input-row">
            <div class="input-block">
                <label for="street" class="label">Улица</label>
                <input :value="street" @input="$emit('input', { field: 'street', value: $event.target.value })"
                    id="street" class="input-field" />
            </div>
            <div class="input-block">
                <label for="home" class="label">Дом</label>
                <input :value="home" @input="$emit('input', { field: 'home', value: $event.target.value })" id="home"
                    class="input-field" type="number" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['index', 'country', 'region', 'city', 'street', 'home', 'validation'],
}
</script>