import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { Item } from "./Item"
import { User } from "./User"

@Entity()
export class Collection {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    collectionDate: Date

    @ManyToOne((type) => User, (user) => user.collections, { nullable: false })
    user: User

    @OneToMany((type) => Item, (item) => item.collection)
    items: Item[]

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}