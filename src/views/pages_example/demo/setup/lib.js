export const person = reactive({
    age: 12,
    sex: 'boy',
    methods: {
        eat: function() {
            console.log('eat')
        }
    }
})

export function add() {
    person.age++
    person.methods.eat()
    console.log(`数字增加到了${person.age}`)
    return
}