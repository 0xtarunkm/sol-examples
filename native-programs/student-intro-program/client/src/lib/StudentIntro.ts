import * as borsh from "@coral-xyz/borsh";

export class Student {
    name: string;
    message: string;

    constructor(name: string, message: string) {
        this.name = name;
        this.message = message;
    }

    borshInstructionSchema = borsh.struct([
        borsh.u8('variant'),
        borsh.str('name'),
        borsh.str('message')
    ])

    serialize(): Buffer {
        const buffer = Buffer.alloc(1000);
        this.borshInstructionSchema.encode({ ...this, variant: 0}, buffer);
        return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer));
    }
}