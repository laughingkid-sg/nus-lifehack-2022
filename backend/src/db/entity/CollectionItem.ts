import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { Collection } from "./Collection"
import { Item } from "./Item"

@Entity()
export class CollectionItem {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "int", nullable: false})
    qty: number

    @ManyToOne((type) => Collection, (collection) => collection.collectionItems, { nullable: false })
    collection: Collection

    @OneToMany((type) => Item, (item) => item.collectionItem)
    items: Item[]

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}