interface FilterPetsRequest {
  name_value?: string | null;
  type_value?: 'dog' | 'cat' | null;
  age_value?: 'puppy' | 'adult' | 'old' | null;
  size_value?: 'small' | 'medium' | 'big' | null;
  energy_level_value?: number | null;
  dependency_level_value?: number | null;
  description_value?: string | null;
  org_id_value?: string | null;
  OR?:  Array<{ name: string; age: string }> | null;
}

export class GetFilter {
  async filter({
    name_value,
    type_value,
    age_value,
    size_value,
    energy_level_value,
    dependency_level_value,
    description_value,
    org_id_value,
  }: FilterPetsRequest) {
    const OR: any = [];

    if (name_value) {
      OR.push({ name: name_value });
    }
    if (type_value) {
      OR.push({ type: type_value });
    }
    if (age_value) {
      OR.push({ age: age_value });
    }
    if (size_value) {
      OR.push({ size: size_value });
    }
    if (energy_level_value) {
      OR.push({ energy_level: energy_level_value });
    }
    if (dependency_level_value) {
      OR.push({ dependency_level: dependency_level_value });
    }
    if (description_value) {
      OR.push({ description: description_value });
    }
    if (org_id_value) {
      OR.push({ org_id: org_id_value });
    }
    return OR;
  }
}
