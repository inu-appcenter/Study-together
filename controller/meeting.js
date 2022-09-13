import Meeting from '../models/Meeting.js';

export async function getMeetingList(req, res){
  const interest = req.body.interest;

  const meetingList = await Meeting.find({interest: interest});

  if (!meetingList){
    return res.status(404).json({message: 'not found meeting list'});
  }
  return res.status(200).json({meetingList: meetingList});
}

export async function createMeeting(req, res){
  const find = await Meeting.findOne({title: req.body.title});

  if (find){
    return res.status(405).json({message: 'already exist meeting title!'});
  }

  const newMeeting = new Meeting({
    title: req.body.title,
    location: req.body.location,
    interest: req.body.interest,
    maxNumber: req.body.maxNumber,
    admin: req.decoded._id,
    member: []
  })

  newMeeting.member.push(req.decoded._id);
  
  // save update
  await newMeeting.save();

  res.status(201).json({message: 'Successfully created!', meeting: newMeeting});
}

export async function joinMeeting(req, res){
  const findMeeting = await Meeting.findOne({title: req.body.title});

  if (!findMeeting){
    return res.status(404).json({message: 'not found that meeting title'});
  }

  const length = findMeeting.member.length;
  // first constraint : if already full that meeting?
  if (length + 1 > findMeeting.maxNumber){
    return res.status(405).json({message: 'that meeting already full'});
  }

  // second constraint : if already joined that meeting?

  //const checkMember = await findMeeting.find({"member":{"$elemMatch":{_id: req.decoded._id}}});
  const checkMember = findMeeting.member.includes(req.decoded._id);
  // Error : findMeeting.find is not a function!
  // Solve : using JS array method includes

  if (checkMember) {
    return res.status(405).json({message: 'already joined that meeting!'});
  }
  findMeeting.member.push(req.decoded._id);

  await findMeeting.save();
  return res.status(200).json({message: 'successfully join!'});
}



