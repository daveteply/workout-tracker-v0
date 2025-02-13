import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // Create activity categories
  const categoryStrengthTraining = await prisma.activityCategory.create({
    data: {
      title: 'Strength Training',
      description:
        'Strength training is a type of physical exercise specializing in the use of resistance to induce muscular contraction which builds the strength, anaerobic endurance, and size of skeletal muscles.',
    },
  });

  const categoryCardiovascular = await prisma.activityCategory.create({
    data: {
      title: 'Cardiovascular',
      description:
        'Cardiovascular exercise is any exercise that raises your heart rate. Face it our bodies were made to move. And we all know that to keep our muscles in shape we need move them. This movement makes them stronger and stronger muscles make for a more efficient and healthy body.',
    },
  });

  const categoryFlexibility = await prisma.activityCategory.create({
    data: {
      title: 'Flexibility and Balance',
      description: 'Flexibility and balance exercises help you stay limber and agile.',
    },
  });

  const categoryHighIntensity = await prisma.activityCategory.create({
    data: {
      title: 'High-Intensity Interval Training',
      description:
        'High-intensity interval training (HIIT) is a form of interval training, a cardiovascular exercise strategy alternating short periods of intense anaerobic exercise with less intense recovery periods.',
    },
  });

  const categoryBodyweight = await prisma.activityCategory.create({
    data: {
      title: 'Bodyweight',
      description:
        'Bodyweight exercises are strength training exercises that use the individual’s own weight to provide resistance against gravity.',
    },
  });

  // Create activities
  const ActivitySquat = await prisma.activity.create({
    data: {
      title: 'Squat',
      description:
        'The squat is a lower body exercise. It works the gluteus, hamstrings, quadriceps, hip flexors, and calves.',
      categoryId: categoryStrengthTraining.id,
    },
  });

  const ActivityDeadLift = await prisma.activity.create({
    data: {
      title: 'Deadlift',
      description:
        'The dead lift is a weight training exercise in which a loaded barbell or bar is lifted off the ground to the level of the hips, then lowered to the ground.',
      categoryId: categoryStrengthTraining.id,
    },
  });

  const ActivityBenchPress = await prisma.activity.create({
    data: {
      title: 'Bench Press',
      description: 'The bench press is an upper-body weight training exercise.',
      categoryId: categoryStrengthTraining.id,
    },
  });

  const ActivityBentOverRow = await prisma.activity.create({
    data: {
      title: 'Bent Over Row',
      description:
        'The bent-over row is a weight training exercise that targets a variety of back muscles.',
      categoryId: categoryStrengthTraining.id,
    },
  });

  const ActivityOverheadPress = await prisma.activity.create({
    data: {
      title: 'Overhead Press',
      description:
        'The overhead press is a compound movement that targets a variety of upper body muscles.',
      categoryId: categoryStrengthTraining.id,
    },
  });

  const ActivityRunning = await prisma.activity.create({
    data: {
      title: 'Running',
      description:
        'Running is a method of terrestrial locomotion allowing humans and other animals to move rapidly on foot.',
      categoryId: categoryCardiovascular.id,
    },
  });

  const ActivityCycling = await prisma.activity.create({
    data: {
      title: 'Cycling',
      description:
        'Cycling, also called biking or bicycling, is the use of bicycles for transport, recreation, exercise or sport.',
      categoryId: categoryCardiovascular.id,
    },
  });

  const ActivitySwimming = await prisma.activity.create({
    data: {
      title: 'Swimming',
      description:
        'Swimming is an individual or team racing sport that requires the use of one’s entire body to move through water.',
      categoryId: categoryCardiovascular.id,
    },
  });

  const ActivityJumpingRope = await prisma.activity.create({
    data: {
      title: 'Jumping Rope',
      description:
        'Jumping rope is a great calorie-burner. You’d have to run an eight-minute mile to work off more calories than you’d burn jumping rope.',
      categoryId: categoryCardiovascular.id,
    },
  });

  const ActivityYoga = await prisma.activity.create({
    data: {
      title: 'Yoga',
      description:
        'Yoga is a group of physical, mental, and spiritual practices or disciplines that originated in ancient India.',
      categoryId: categoryFlexibility.id,
    },
  });

  const ActivityPilates = await prisma.activity.create({
    data: {
      title: 'Pilates',
      description:
        'Pilates is a physical fitness system developed in the early 20th century by Joseph Pilates.',
      categoryId: categoryFlexibility.id,
    },
  });

  const ActivityMountainClimbers = await prisma.activity.create({
    data: {
      title: 'Mountain Climbers',
      description:
        'Mountain climbers are a great total body exercise. You use your core because you are starting from a plank position.',
      categoryId: categoryHighIntensity.id,
    },
  });

  const ActivityJumpingLunges = await prisma.activity.create({
    data: {
      title: 'Jumping Lunges',
      description:
        'Jumping lunges are a great lower body exercise that also gets your heart rate up.',
      categoryId: categoryHighIntensity.id,
    },
  });

  const ActivityBurpees = await prisma.activity.create({
    data: {
      title: 'Burpees',
      description:
        'Burpees are a full body exercise that can be done anywhere. They are great for conditioning.',
      categoryId: categoryHighIntensity.id,
    },
  });

  const ActivityPlank = await prisma.activity.create({
    data: {
      title: 'Plank',
      description:
        'The plank is a great exercise for your core. It helps build strength and stability.',
      categoryId: categoryBodyweight.id,
    },
  });

  const ActivityTreadmill = await prisma.activity.create({
    data: {
      title: 'Treadmill',
      description: 'Perform various cardio exercises like walking, jogging and running',
      categoryId: categoryCardiovascular.id,
    },
  });

  // Attributes
  const AttributeRepetitions = await prisma.activityAttribute.create({
    data: {
      title: 'Repetitions',
      description: 'The number of times an exercise is completed.',
      attributeType: 'NUMBER',
    },
  });

  const AttributeWeight = await prisma.activityAttribute.create({
    data: {
      title: 'Weight',
      description: 'The amount of weight used for an exercise.',
      attributeType: 'MASS',
    },
  });

  const AttributeDistance = await prisma.activityAttribute.create({
    data: {
      title: 'Distance',
      description: 'The distance covered during an exercise.',
      attributeType: 'LENGTH',
    },
  });

  const AttributeDuration = await prisma.activityAttribute.create({
    data: {
      title: 'Duration',
      description: 'The amount of time an exercise is completed.',
      attributeType: 'TIME',
    },
  });

  const AttributeProgramId = await prisma.activityAttribute.create({
    data: {
      title: 'Program Id',
      description: 'The program id associated with an exercise.',
      attributeType: 'STRING',
    },
  });

  const AttributeLaps = await prisma.activityAttribute.create({
    data: {
      title: 'Laps',
      description: 'The number of laps completed during an exercise.',
      attributeType: 'NUMBER',
    },
  });

  const AttributeIncline = await prisma.activityAttribute.create({
    data: {
      title: 'Incline',
      description: 'The degree of slope or angle on the running surface.',
      attributeType: 'NUMBER',
    },
  });

  const AttributeRate = await prisma.activityAttribute.create({
    data: {
      title: 'Rate',
      description: 'A measure of the rate or speed for an activity.',
      attributeType: 'NUMBER',
    },
  });

  // Activity Attributes
  await prisma.activityActivityAttributes.createMany({
    data: [
      { activityId: ActivitySquat.id, attributeId: AttributeRepetitions.id },
      { activityId: ActivitySquat.id, attributeId: AttributeWeight.id },
      { activityId: ActivityDeadLift.id, attributeId: AttributeRepetitions.id },
      { activityId: ActivityDeadLift.id, attributeId: AttributeWeight.id },
      { activityId: ActivityBenchPress.id, attributeId: AttributeRepetitions.id },
      { activityId: ActivityBenchPress.id, attributeId: AttributeWeight.id },
      { activityId: ActivityBentOverRow.id, attributeId: AttributeRepetitions.id },
      { activityId: ActivityBentOverRow.id, attributeId: AttributeWeight.id },
      { activityId: ActivityOverheadPress.id, attributeId: AttributeRepetitions.id },
      { activityId: ActivityOverheadPress.id, attributeId: AttributeWeight.id },
      { activityId: ActivityRunning.id, attributeId: AttributeDistance.id },
      { activityId: ActivityCycling.id, attributeId: AttributeDistance.id },
      { activityId: ActivitySwimming.id, attributeId: AttributeDistance.id },
      { activityId: ActivitySwimming.id, attributeId: AttributeLaps.id },
      { activityId: ActivityJumpingRope.id, attributeId: AttributeDuration.id },
      { activityId: ActivityYoga.id, attributeId: AttributeDuration.id },
      { activityId: ActivityPilates.id, attributeId: AttributeDuration.id },
      { activityId: ActivityMountainClimbers.id, attributeId: AttributeDuration.id },
      { activityId: ActivityJumpingLunges.id, attributeId: AttributeDuration.id },
      { activityId: ActivityBurpees.id, attributeId: AttributeDuration.id },
      { activityId: ActivityPlank.id, attributeId: AttributeDuration.id },
      { activityId: ActivityTreadmill.id, attributeId: AttributeDistance.id },
      { activityId: ActivityTreadmill.id, attributeId: AttributeProgramId.id },
      { activityId: ActivityTreadmill.id, attributeId: AttributeIncline.id },
      { activityId: ActivityTreadmill.id, attributeId: AttributeDuration.id },
      { activityId: ActivityTreadmill.id, attributeId: AttributeRate.id },
    ],
  });

  // Members
  await prisma.member.createMany({
    data: [
      {
        name: 'Default Member',
        email: 'member@member.com',
        role: 'MEMBER',
      },
      {
        name: 'Gabriella Prohaska',
        email: 'Gabriella.Prohaska53@yahoo.com',
        role: 'MEMBER',
      },
      {
        name: 'Antonia Predovic',
        email: 'Antonia.Predovic@hotmail.com',
        role: 'MEMBER',
      },
      {
        name: 'Gwendolyn Kulas',
        email: 'Gwendolyn.Kulas93@hotmail.com',
        role: 'MEMBER',
      },
      {
        name: 'Clifford Hane',
        email: 'Clifford.Hane@yahoo.com',
        role: 'MEMBER',
      },
      {
        name: 'Boris Walker',
        email: 'Boris.Walker@hotmail.com',
        role: 'MEMBER',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
