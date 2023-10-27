export class Message {
  static required = "is required!"
}

export class AddClothesMessage {
  static required = "name " + Message.required
}