import Group from '../models/Group/Group.js';

export const getGroupList = async function (req, res){
  const interest = req.body.interest;

  const groupList = await Group.find({interest: interest});

  if (!groupList){
    return res.status(404).json({message: 'not found group list'});
  }
  return res.status(200).json({groupList: groupList});
}

export const createGroup = async function (req, res){
  const find = await Group.findOne({title: req.body.title});

  if (find){
    return res.status(405).json({message: 'already exist meeting title!'});
  }

  const newGroup = new Group({
    title: req.body.title,
    location: req.body.location,
    interest: req.body.interest,
    maxNumber: req.body.maxNumber,
    admin: req.decoded._id,
    member: []
  })

  newGroup.member.push(req.decoded._id);
  
  // save update
  await newGroup.save();

  res.status(201).json({message: 'Successfully created!', group: newGroup});
}

export const joinGroup = async function (req, res){
  const findGroup = await Group.findOne({title: req.body.title});

  if (!findGroup){
    return res.status(404).json({message: 'not found that meeting title'});
  }

  const length = findGroup.member.length;
  // first constraint : if already full that meeting?
  if (length + 1 > findGroup.maxNumber){
    return res.status(405).json({message: 'that group already full'});
  }

  // second constraint : if already joined that meeting?

  //const checkMember = await findMeeting.find({"member":{"$elemMatch":{_id: req.decoded._id}}});
  const checkMember = findGroup.member.includes(req.decoded._id);
  // Error : findMeeting.find is not a function!
  // Solve : using JS array method includes

  if (checkMember) {
    return res.status(405).json({message: 'already joined that meeting!'});
  }
  findGroup.member.push(req.decoded._id);

  await findGroup.save();
  return res.status(200).json({message: 'successfully join!'});
}



