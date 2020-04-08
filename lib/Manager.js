class Engineer extends Employee{

    constructor(name,id,email,office){
        super(name,id,email)

        this.gitHub = office;
    }
    getGitHub(){
        return this.office;
    }
    getRole(){
        return "Manager";
    }

}