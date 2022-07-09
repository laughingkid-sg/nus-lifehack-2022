import { CollectionItem } from './CollectionItem';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { User } from "./User"

export enum CollectionStatus {
    PENDING = "pending",
    CANCELLED = "cancelled",
    SCHEDULED = "scheduled",
    COLLECTED = "collected",
    COMPLETED = "completed",
}

@Entity()
export class Collection {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: true })
    collectionDate: string

    @Column({ default: CollectionStatus.PENDING, nullable: false })
    status: CollectionStatus

    @Column({ type: "int", nullable: true })
    pointsAwarded: number

    @Column({ type: "int", nullable: true })
    pointClaimed: number

    @ManyToOne((type) => User, (user) => user.collections, { nullable: false })
    @JoinColumn({referencedColumnName: "telegramId"})
    user: User

    @OneToMany((type) => CollectionItem, (collectionItem) => collectionItem.collection)
    collectionItems?: CollectionItem[]

    @CreateDateColumn()
    createdDate?: Date

    @UpdateDateColumn()
    updatedDate?: Date
}
