import { $Enums, Pet, Prisma, Requirement, Roles } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PetsRepository } from '../pet-repository';

interface PetInterface {
  id: string;
  name: string;
  type: $Enums.Type;
  age: $Enums.Age;
  size: $Enums.Size;
  energy_level: number;
  dependency_level: number;
  description: string;
  org_id: string;
  requirement?: {
    id: string;
    pet_id: string;
    description: string;
    create_at: Date;
    update_at: Date | null;
  }[];
}

interface OrgInterface {
  id: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  cep: string;
  uf: string;
  city: string;
  owner_name?: string | null;
  role?: Roles;
  pets?: PetInterface[];
}

export class InMemoryPetRepository implements PetsRepository {
  public items: PetInterface[] = [];
  public users: OrgInterface[] = [];

  async CreateInMemoryUser(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address,
      phone: data.phone,
      cep: data.cep,
      uf: data.uf,
      city: data.city,
      role: data.role ? data.role : Roles.organization,
      owner_name: data.owner_name ? data.owner_name : null,
    };

    this.users.push(user);
    return user;
  }

  async findByCity(city: string) {
    const user = this.users.find((item) => item.city === city);

    if (user?.pets) {
      return user.pets;
    } else {
      return null;
    }
  }

  async findRequirement(pet_id: string) {
    //Tentativas de acessa objetos dentro ta entidade Pet usando prisma
    //const pet : Pet.$PetPayload.object

    // const requirements = Prisma.validator<Prisma.PetDefaultArgs>()({
    //   include: {requirements: true}
    // })

    // type petRequirement = Prisma.PetGetPayload<typeof requirements>
    // const pet: petRequirement = this.items.find((item) => item.id === id);

    const pet = this.items.find((item) => item.id === pet_id);

    if (pet?.requirement) {
      return pet.requirement;
    } else {
      return null;
    }
  }

  async findMany(query: object) {
    let filteredPets: PetInterface[] = [];

    const filter = Object.entries(query);

    filter.forEach((filter) => {
      const key = filter[0] as keyof PetInterface;
      const value = filter[1];

      const pet = this.items.find((item) => item[key] === value);
      if (pet) {
        filteredPets.push(pet);
      }
    });

    return filteredPets;
  }

  async findByOrg(org_id: string) {
    const pets = this.items.filter((item) => item.org_id === org_id);

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      type: data.type,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      dependency_level: data.dependency_level,
      description: data.description,
      org_id: data.org_id,
    };

    const user = this.users.find((item) => item.id === data.org_id);
    console.log(user);
    user?.pets?.push(pet);
    this.items.push(pet);
    return pet;
  }
  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }
}
