<script setup lang="ts">
    interface Props {
        modelValue: boolean;
        studentName: string;
    }

    interface Emits {
        (e: 'update:modelValue', value: boolean): void;
        (e: 'confirm'): void;
    }

    defineProps<Props>();
    const emit = defineEmits<Emits>();

    const handleClose = () => {
        emit('update:modelValue', false);
    };

    const handleConfirm = () => {
        emit('confirm');
        handleClose();
    };
</script>

<template>
    <v-dialog
        :model-value="modelValue"
        max-width="500"
        @update:model-value="handleClose"
    >
        <v-card>
            <v-card-title class="text-h5">Excluir Aluno</v-card-title>
            <v-card-text>
                Tem certeza que deseja excluir o aluno
                <strong>{{ studentName }}</strong
                >? Esta ação não pode ser desfeita.
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey-darken-1" variant="text" @click="handleClose"
                    >Cancelar</v-btn
                >
                <v-btn color="error" variant="text" @click="handleConfirm"
                    >Excluir</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
