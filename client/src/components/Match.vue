<template>
    <tr class="match">
        <td>{{ getMatchDate() }}</td>
        <td>{{ match.home_team.name }} - {{ match.away_team.name }}</td>
        <td v-if="canEdit">
            <div class="forecast-fields">
                <input
                    class="input"
                    v-model="home_team_score"
                    type="number"
                >
                -
                <input
                    class="input"
                    v-model="away_team_score"
                    type="number"
                >
            </div>
        </td>
        <td v-else>{{ getResultString('forecast') }}</td>
        <td>{{ getResultString('real') }}</td>
    </tr>
</template>

<script>
export default {
    props: {
        match: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            home_team_score: '',
            away_team_score: '',
            forecastResult: null,
            canEdit: false
        }
    },
    methods: {
        getResultString(type) {
            let result = this.getResult(type);
            if (!result) {
                return '';
            }
            return `${result.home} - ${result.away}`;
        },
        getResult(type) {
            return _.find(this.match.results, (result) => {
                return this.resultComparative(type, result);
            });
        },
        resultComparative(type, result) {
            return type == 'real' ? result.user == null : result.user != null;
        },
        getMatchDate() {
            return moment(this.match.date).format('DD MMMM - HH:mm');
        },
        getForecast() {
            if (!this.canEdit) {
                return null;
            }

            let home = parseInt(this.home_team_score);
            let away = parseInt(this.away_team_score);
            
            if (isNaN(home) || isNaN(away)) {
                return null
            }
            return {
                match_id: this.match.id,
                result: this.forecastResult,
                home: Math.abs(home),
                away: Math.abs(away)
            }
        }
    },
    created() {
        let fiveMinutesBefore = moment(this.match.date);
        this.canEdit = moment().diff(fiveMinutesBefore, 'minutes') < -5;
        if (this.canEdit) {
            this.forecastResult = this.getResult('forecast');
            if (this.forecastResult) {
                this.home_team_score = this.forecastResult.home;
                this.away_team_score = this.forecastResult.away;
            }
        }
    }
}
</script>

<style lang="scss">

.match {

    td {
        text-align: center;
        vertical-align: middle;
    }

    .forecast-fields {
        width: 120px;
        display: flex;
        justify-content: center;
        align-items: center;

        .field {
            -moz-appearance: textfield;
            margin: 0px;
        }

        input {
            text-align: center;

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }

        
    }

}

</style>