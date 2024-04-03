<template>
    <div class="form-block">
        <div class="input-block">
            <div class="input-head">
                <label for="surname" class="label">Фамилия*</label>
                <div class="error" v-if="validation.surname.$error">Обязательное поле</div>
            </div>
            <input id="surname" @input="$emit('input', { field: 'surname', value: $event.target.value })"
                :value="surname" class="input-field" :class="{ 'input-error': validation.surname.$error }" type="text"
                required />
        </div>
        <div class="input-block">
            <div class="input-head">
                <label for="name" class="label">Имя*</label>
                <div class="error" v-if="validation.name.$error">Обязательное поле</div>
            </div>
            <input id="name" @input="$emit('input', { field: 'name', value: $event.target.value })" :value="name"
                class="input-field" :class="{ 'input-error': validation.name.$error }" type="text" required />
        </div>
        <div class="input-block">
            <label for="mName" class="label">Отчество</label>
            <input id="mName" @input="$emit('input', { field: 'mName', value: $event.target.value })" :value="mName"
                class="input-field" type="text" />
        </div>
        <div class="input-block">
            <div class="input-head">
                <label for="dateOfBirth" class="label">Дата рождения*</label>
                <div class="error" v-if="validation.dateOfBirth.$error">Некорректная дата</div>
            </div>
            <input id="dateOfBirth" type="date" :class="{ 'input-error': validation.dateOfBirth.$error }"
                @input="$emit('input', { field: 'dateOfBirth', value: $event.target.value })" :value="dateOfBirth" />
        </div>
        <div class="input-block">
            <div class="input-head">
                <label for="phone" class="label">Номер телефона*</label>
                <div class="error" v-if="validation.phoneNumber.$error">Обязательное поле</div>
            </div>
            <input @input="checkPhoneNumberLength" v-model="phoneNumberInput"
                :class="{ 'input-error': validation.phoneNumber.$error }" id="phone" class="input-field" required />
            <div class="disable-message">
                <input id="disable-message" type="checkbox" />
                <label for="disable-message">Не отправлять смс</label>
            </div>
        </div>
        <div class="input-block">
            <label class="label">Пол</label>
            <div class="gender">
                <div class="gender-block">
                    <input @input="$emit('input', { field: 'gender', value: $event.target.value })" class="input-radio"
                        type="radio" name="gender" id="man" value="Мужской" />
                    <label for="man">Мужской</label>
                </div>
                <div class="gender-block">
                    <input @input="$emit('input', { field: 'gender', value: $event.target.value })" class="input-radio"
                        type="radio" name="gender" id="women" value="Женский" />
                    <label for="women">Женский</label>
                </div>
            </div>
        </div>
        <div class="input-block">
            <div class="input-head">
                <label class="label">Группа клиента*</label>
                <div class="error" v-if="validation.selectedGroups.$error">Обязательное поле</div>
            </div>
            <multi-select :isError="validation.selectedGroups.$error" :options="groupList"
                :selectedOptions="selectedGroups" selectName="group" :currentOpenDropMenu="currentOpenDropMenu"
                @setDropMenu="(menuName) => $emit('setDropMenu', menuName)"
                @input="(groupList) => $emit('input', { field: 'selectedGroups', value: groupList })" />
        </div>
        <div class="input-block">
            <label for="doctor" class="label">Лечащий врач</label>
            <select @input="$emit('input', { field: 'doctor', value: $event.target.value })" id="doctor">
                <option value="">Выберите врача</option>
                <option v-for="doctor in doctorsList" :key="doctor" :value="doctor">{{ doctor }}</option>
            </select>
        </div>
    </div>
</template>
<script>
import MultiSelect from '@/UI/MultiSelect/MultiSelect.vue';
import './GeneralInfo.scss'
export default {
    props: ['selectedGroups', 'currentOpenDropMenu', 'gender', 'name', 'surname', 'validation', 'mName', 'dateOfBirth', 'phoneNumber'],
    emits: ['setDropMenu', 'input'],
    components: { MultiSelect },
    data() {
        return {
            groupList: ["VIP", "Проблемные", "ОМС"],
            doctorsList: ["Иванов", "Захаров", "Чернышева"],
            phoneNumberInput: '+7'
        }
    },
    methods: {
        checkPhoneNumberLength(e) {
            if (this.phoneNumberInput.length < 3) {
                this.phoneNumberInput = '+7'
                return
            }

            if (this.phoneNumberInput.length > 11) {
                this.phoneNumberInput = this.phoneNumberInput.slice(0, 11)
                return
            }

            // Если последний введенный символ не число, отменяем ввод. С <input type="number" /> нельзя использовать "+"
            if (!Number(e.target.value.slice(-1))) {
                this.phoneNumberInput = e.target.value.slice(0, e.target.value.length - 1)
            }
        },
    },
    watch: {
        phoneNumber() {
            this.phoneNumberInput = this.phoneNumber
        },
        phoneNumberInput() {
            this.$emit('input', { field: 'phoneNumber', value: this.phoneNumberInput })
        }
    }
}
</script>