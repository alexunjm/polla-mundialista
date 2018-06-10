<template>
    <div class="matches-container">
        <h1 class="title is-5">Recuerda que puedes modificar tus pronósticos hasta 5 minutos antes del comienzo de cada partido</h1>
        <hr>
        <table class="table matches">
            <thead>
                <tr>
                    <th>Horario</th>
                    <th>Partido</th>
                    <th>Pronóstico</th>
                    <th>Resultado</th>
                </tr>
            </thead>
            <tbody>
                <match
                    v-for="(match, index) in matches"
                    :match="match"
                    :key="index"
                ></match>
            </tbody>
        </table>
        <hr>
        <button @click="saveMatches" class="button">Guardar</button>
    </div>
</template>

<script>
import match from './Match.vue';

export default {
    props: {
        stage: {
            type: String,
            required: true
        }
    },
    components: {
        match
    },
    data() {
        return {
            matches: []
        }
    },
    methods: {
        saveMatches() {
            let matches = [];
            this.$children.forEach(match => {
                let forecast = match.getForecast();
                if (forecast) {
                    matches.push(forecast);
                }
            });
            console.log(matches);
        },
        fetchMatches() {
            this.matches = [
                {
                    id: 1,
                    home_team: {
                        name: 'Colombia'
                    },
                    away_team: {
                        name: 'Japon'
                    },
                    date: '2018-06-11 11:26:00',
                    results: [
                        {
                            user: null,
                            home: 0,
                            away: 0
                        },
                        {
                            user: {
                                email: 'loquesea'
                            },
                            home: 1,
                            away: 1
                        }
                    ]
                },
                {
                    id: 2,
                    home_team: {
                        name: 'Polonia'
                    },
                    away_team: {
                        name: 'Senegal'
                    },
                    date: '2018-06-15 16:00:00',
                    results: [
                        {
                            user: {
                                email: 'loquesea'
                            },
                            home: 0,
                            away: 3
                        }
                    ]
                }
            ];
        }
    },
    mounted() {
        this.fetchMatches();
    }
}
</script>

<style lang="scss" scoped>

.matches {
    margin: 0 auto;

    thead th {
        text-align: center;
    }
}

</style>