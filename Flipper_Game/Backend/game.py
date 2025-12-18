import random

OBJECTS = {
"sandwich": ["Jam Side Up", "Jam Side Down"],
"shoe": ["Flat Side Up", "Flat Side Down"],
}

def toss(object_type: str):
    if object_type == "jointed":
        return {
        "sandwich": random.choice(OBJECTS["sandwich"]),
        "shoe": random.choice(OBJECTS["shoe"]),
        }

    if object_type not in OBJECTS:
        raise ValueError("Invalid object")

    return random.choice(OBJECTS[object_type])
