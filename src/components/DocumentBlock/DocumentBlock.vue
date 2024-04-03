<template>
    <div class="form-block">
        <h2 class="title">Паспортные данные</h2>
        <div class="input-block">
            <div class="input-head">
                <label for="typeOfDocument" class="label">Тип документа*</label>
                <div class="error" v-if="validation.typeOfDocument.$error">Обязательное поле</div>
            </div>
            <select id="typeOfDocument" @input="$emit('input', { field: 'typeOfDocument', value: $event.target.value })"
                class="select" :class="{ 'input-error': validation.typeOfDocument.$error }" :value="typeOfDocument">
                <option value="">Выберите тип документа</option>
                <option v-for="document in documentList" :key="document" :value="document">{{ document }}</option>
            </select>
        </div>
        <div class="input-row">
            <div class="input-block">
                <label for="serial" class="label">Серия</label>
                <input type="number" @input="$emit('input', { field: 'serial', value: $event.target.value })"
                    :value="serial" id="serial" class="input-field" />
            </div>
            <div class="input-block">
                <label for="numberOfDocument" class="label">Номер</label>
                <input type="number" @input="$emit('input', { field: 'numberOfDocument', value: $event.target.value })"
                    :value="numberOfDocument" id="numberOfDocument" class="input-field" />
            </div>
        </div>
        <div class="input-block">
            <label for="receivedFrom" class="label">Кем выдан</label>
            <input @input="$emit('input', { field: 'receivedFrom', value: $event.target.value })" id="receivedFrom"
                :value="receivedFrom" class="input-field" required />
        </div>
        <div class="input-block">
            <div class="input-head">
                <label for="dateOfReceive" class="label">Дата выдачи*</label>
                <div class="error" v-if="validation.dateOfReceive.$error">Обязательное поле</div>
            </div>
            <input id="dateOfReceive" :class="{ 'input-error': validation.dateOfReceive.$error }"
                @input="$emit('input', { field: 'dateOfReceive', value: $event.target.value })" :value="dateOfReceive"
                type="date" />
        </div>
    </div>
</template>
<script>
export default {
    props: [
        "typeOfDocument",
        "serial",
        "numberOfDocument",
        "receivedFrom",
        "dateOfReceive",
        'validation'
    ],
    data() {
        return {
            documentList: ["Паспорт", "Свидетельство о рождении", "Вод. удостоверение"],
        }
    },
}
</script>