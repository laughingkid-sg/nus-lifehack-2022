import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
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

    @ManyToOne((type) => Item, (item) => item.collectionItems, { nullable: false })
    item: Item

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}