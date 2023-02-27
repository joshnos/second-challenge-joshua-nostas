import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'post' })
export class Post {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    description: string

}
